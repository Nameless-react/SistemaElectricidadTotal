import { promises as fsPromises } from 'fs';

class ImageService {
    constructor(writeFile, path) {
        this.writeFile = writeFile;
        this.path = path;
    }

    async uploadImage(formData, folder) {
        try {
            const file = formData.get('image');

            if (!file) {
                return { success: false, error: 'No file provided' };
            }

            const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validMimeTypes.includes(file.type)) {
                return { success: false, error: 'Invalid file type' };
            }

            const buffer = await this.convertFileToBuffer(file);
            const directoryPath = this.path.join(process.cwd(), 'public', folder);

           
            await fsPromises.mkdir(directoryPath, { recursive: true });

            const filePath = this.path.join(directoryPath, file.name);

            await this.saveFile(filePath, buffer);

            return { success: true, filePath: `/public/${folder}/${file.name}` };
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