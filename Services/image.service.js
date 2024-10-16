import { promises as fsPromises } from 'fs';

class ImageService {
    /**
     * Constructor for the ImageService class
     * 
     * @param {function} writeFile - The function to write a file to the file system
     * @param {string} path - The path to the file system
     * @param {Object} adminFirebase - The admin Firebase object
     */
    constructor(writeFile, path, adminFirebase) {
        this.writeFile = writeFile;
        this.path = path;
        this.adminFirebase = adminFirebase;
    }

    /**
     * Uploads an image to Firebase Storage and returns a signed URL for the image
     * 
     * @param {FormData} formData - The form data containing the image to be uploaded
     * @param {string} folder - The folder in which to store the image in Firebase Storage
     * @returns {Promise<{success: boolean, imagePath: string}>} A promise that resolves with an object containing the success status and the signed URL for the image
     */
    async uploadImageToFirebase(formData, folder) {
        const bucket = this.adminFirebase.storage().bucket();

        if (!formData) {
            return { success: false, error: 'No image provided' };
        }

        try {
            const file = formData.get('image');

            if (typeof file === 'string') {
                console.warn('Image is a string; continuing execution.');
                return { success: true, filePath: file };
            }

            const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validMimeTypes.includes(file.type)) {
                return { success: false, error: 'Invalid file type' };
            }

            // Convert the file to a buffer
            const buffer = await this.convertFileToBuffer(file);

            // Define a path for the file in Firebase Storage
            const firebaseFilePath = `${folder}/${file.name}`;
            const fileUpload = bucket.file(firebaseFilePath);

            // Create a stream to upload the buffer
            const stream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.type
                }
            });

            // Write the buffer to Firebase
            stream.end(buffer);

            return new Promise(async (resolve, reject) => {
                stream.on('finish', async () => {
                    try {
                        // The image has been uploaded successfully
                        // Generate a signed URL for the uploaded image
                        const [url] = await fileUpload.getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // Expires in 1 month
                        });

                        resolve({ success: true, imagePath: url });
                    } catch (error) {
                        console.error('Error generating signed URL:', error);
                        reject({ success: false, error: 'Error generating signed URL' });
                    }
                });

                stream.on('error', (error) => {
                    console.error('Error uploading to Firebase Storage:', error);
                    reject({ success: false, error: 'Error uploading to Firebase Storage' });
                });
            });

        } catch (error) {
            console.error('Error processing file upload:', error);
            return { success: false, error: 'Error processing file upload' };
        }
    }
    async uploadImage(formData, folder, host) {
        try {
            const file = formData.get('image');

            // Si 'image' es un string, retornar éxito
            if (typeof file === 'string') {
                console.warn('Image is a string; continuing execution.');
                return { success: true, filePath: file }; // Puedes retornar el string como la ruta de la imagen
            }

            // Si no se proporciona un archivo, retornar éxito pero continuar la ejecución
            if (!file) {
                console.warn('No image provided; continuing execution.');
                return { success: true, message: 'No image provided' };
            }

            const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

            // Verificar si el tipo de archivo es válido
            if (!validMimeTypes.includes(file.type)) {
                return { success: false, error: 'Invalid file type' };
            }

            const buffer = await this.convertFileToBuffer(file);
            const directoryPath = this.path.join(process.cwd(), 'public', folder);

            // Crear la carpeta si no existe
            await fsPromises.mkdir(directoryPath, { recursive: true });

            const filePath = this.path.join(directoryPath, file.name);

            // Guardar el archivo
            await this.saveFile(filePath, buffer);

            const imagePath = 'http://' + host + '/' + folder + '/' + file.name;

            return { success: true, imagePath: imagePath };

        } catch (error) {
            console.error('Error processing file upload:', error);
            return { success: false, error: 'Error processing file upload' };
        }
    }

    async regenerateSignedURL(filePath) {
        const bucket = this.adminFirebase.storage().bucket();
        const fileUpload = bucket.file(filePath);
        const [url] = await fileUpload.getSignedUrl({
            action: 'read',
            expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // Expires in 1 month
        });
        return url;
    }

    /**
     * Checks if a Firebase Storage signed URL has expired.
     * @param {string} url The signed URL provided by Firebase Storage.
     * @returns {Promise<boolean>} true if the URL has expired, false if it hasn't.
     */
    async checkUrlExpiration(url) {
        const parsedUrl = new URL(url);
        const expires = parsedUrl.searchParams.get("Expires");

        if (!expires) {
            console.error('No expiration date found in the URL.');
            return true; // Si no se encuentra, consideramos que ha expirado
        }

        const expirationTime = Date.now() + 10 * 1000; // Expira en 10 segundos
        const currentTime = Date.now();

        return currentTime > expirationTime;
    }
    async convertFileToBuffer(file) {
        const bytes = await file.arrayBuffer();
        return Buffer.from(bytes);
    }

    async saveFile(filePath, buffer) {
        await this.writeFile(filePath, buffer);
    }
}

export default ImageService;