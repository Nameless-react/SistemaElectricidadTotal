import { promises as fsPromises } from 'fs';

class ImageService {
    constructor(writeFile, path) {
        this.writeFile = writeFile;
        this.path = path;
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
    async convertFileToBuffer(file) {
        const bytes = await file.arrayBuffer();
        return Buffer.from(bytes);
    }

    async saveFile(filePath, buffer) {
        await this.writeFile(filePath, buffer);
    }
}

export default ImageService;