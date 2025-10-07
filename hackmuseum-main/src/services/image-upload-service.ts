// Service d'upload d'images
export interface UploadedImage {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

class ImageUploadService {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  private readonly UPLOAD_DIR = '/uploads/images/';

  // Valider un fichier image
  validateFile(file: File): { isValid: boolean; error?: string } {
    if (!file) {
      return { isValid: false, error: 'Aucun fichier sélectionné' };
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Type de fichier non supporté. Utilisez JPG, PNG ou WebP.' 
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return { 
        isValid: false, 
        error: 'Le fichier est trop volumineux. Taille maximum : 5MB.' 
      };
    }

    return { isValid: true };
  }

  // Créer un aperçu de l'image
  createPreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Erreur lors de la lecture du fichier'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsDataURL(file);
    });
  }

  // Traiter un fichier uploadé
  async processUploadedFile(file: File): Promise<UploadedImage> {
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const preview = await this.createPreview(file);
    
    return {
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type
    };
  }

  // Simuler l'upload du fichier (en production, cela enverrait le fichier au serveur)
  async uploadFile(uploadedImage: UploadedImage): Promise<string> {
    // Simuler un délai d'upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // En production, vous utiliseriez FormData pour envoyer le fichier au serveur
    /*
    const formData = new FormData();
    formData.append('image', uploadedImage.file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    return data.imageUrl;
    */

    // Pour la démo, nous utilisons l'URL de prévisualisation
    // En production, cela serait remplacé par l'URL du fichier uploadé sur le serveur
    const timestamp = Date.now();
    const fileName = `${timestamp}-${uploadedImage.name}`;
    const simulatedUrl = `${this.UPLOAD_DIR}${fileName}`;
    
    // Stocker l'image dans le localStorage pour la démo
    localStorage.setItem(`uploaded_image_${timestamp}`, uploadedImage.preview);
    
    return simulatedUrl;
  }

  // Récupérer une image uploadée (pour la démo)
  getUploadedImage(imageUrl: string): string {
    // En production, cette méthode ne serait pas nécessaire
    if (imageUrl.startsWith(this.UPLOAD_DIR)) {
      const timestamp = imageUrl.split('-')[0].split('/').pop();
      const storedImage = localStorage.getItem(`uploaded_image_${timestamp}`);
      return storedImage || imageUrl;
    }
    return imageUrl;
  }

  // Redimensionner une image (optionnel)
  async resizeImage(file: File, maxWidth: number = 800, maxHeight: number = 600): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/jpeg', 0.8);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // Générer un nom de fichier unique
  generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${random}.${extension}`;
  }
}

export const imageUploadService = new ImageUploadService();
export default imageUploadService;