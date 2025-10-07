import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Image as ImageIcon, FileImage, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import imageUploadService, { UploadedImage } from '@/services/image-upload-service';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
  className?: string;
  maxSize?: number; // en MB
  accept?: string;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImage,
  label = "Image de l'œuvre",
  className = "",
  maxSize = 5,
  accept = "image/jpeg,image/png,image/webp",
  disabled = false
}) => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gérer la sélection de fichier
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    setUploadProgress(0);

    try {
      setIsUploading(true);
      const processedImage = await imageUploadService.processUploadedFile(file);
      setUploadedImage(processedImage);

      // Simuler la progression de l'upload
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Upload du fichier
      const imageUrl = await imageUploadService.uploadFile(processedImage);
      onImageUploaded(imageUrl);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
      setUploadedImage(null);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onImageUploaded]);

  // Gérer le changement de fichier
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  // Gérer le drag & drop
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Supprimer l'image sélectionnée
  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
    setError(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageUploaded]);

  // Ouvrir le sélecteur de fichier
  const openFileSelector = useCallback(() => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  // Formater la taille du fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label htmlFor="image-upload">{label}</Label>
      
      <Card 
        className={`
          border-2 border-dashed transition-colors duration-200 cursor-pointer
          ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}
          ${error ? 'border-red-400' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        <CardContent className="p-6">
          <input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
          
          {/* Affichage de l'image actuelle ou uploadée */}
          {(uploadedImage?.preview || currentImage) && !isUploading && (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={uploadedImage?.preview || currentImage}
                  alt="Aperçu"
                  className="max-w-full h-40 object-cover rounded-lg shadow-md"
                />
                {!disabled && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              {uploadedImage && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileImage className="h-4 w-4" />
                  <span>{uploadedImage.name}</span>
                  <Badge variant="secondary">
                    {formatFileSize(uploadedImage.size)}
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          {/* État d'upload */}
          {isUploading && (
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Upload en cours...</p>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  {uploadProgress}% terminé
                </p>
              </div>
            </div>
          )}
          
          {/* Zone d'upload vide */}
          {!uploadedImage && !currentImage && !isUploading && (
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Cliquez pour sélectionner une image
                </p>
                <p className="text-xs text-gray-500">
                  ou glissez-déposez votre fichier ici
                </p>
              </div>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-xs">
                  JPG, PNG, WebP • Max {maxSize}MB
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages d'erreur */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Message de succès */}
      {uploadedImage && !isUploading && !error && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Image uploadée avec succès !
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ImageUpload;