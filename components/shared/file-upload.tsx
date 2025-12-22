import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleX, CloudUpload, FileSpreadsheet, ImageIcon, Upload, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { Progress } from "../ui/progress";

type ImageFile = {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

type SortableImage = {
  id: string;
  src: string;
  alt: string;
  type: 'default' | 'uploaded';
};

type ImageUploadProps = {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImagesChange?: (images: ImageFile[]) => void;
  onUploadComplete?: (images: ImageFile[]) => void;
}

export default function FileUpload({
  maxFiles = 5, // Changed to 5 as per UI reference
  maxSize = 10 * 1024 * 1024, // 10MB as per UI reference
  accept = "image/*",
  className,
  onImagesChange,
  onUploadComplete,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<SortableImage[]>([
    { id: 'default-1', src: 'https://picsum.photos/400/300?random=1', alt: 'Product view 1', type: 'default' },
    { id: 'default-2', src: 'https://picsum.photos/400/300?random=2', alt: 'Product view 2', type: 'default' },
    { id: 'default-3', src: 'https://picsum.photos/400/300?random=3', alt: 'Product view 3', type: 'default' },
    { id: 'default-4', src: 'https://picsum.photos/400/300?random=4', alt: 'Product view 4', type: 'default' },
    { id: 'default-5', src: 'https://picsum.photos/400/300?random=5', alt: 'Product view 5', type: 'default' },
  ]);

  const createSortableImage = useCallback(
    (imageFile: ImageFile): SortableImage => ({
      id: imageFile.id,
      src: imageFile.preview,
      alt: imageFile.file.name,
      type: 'uploaded',
    }),
    [],
  );

  const openFileDialog = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        addImages(target.files);
      }
    };
    input.click();
  }, [accept]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'File must be an image';
    }
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    if (images.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  const simulateUpload = (imageFile: ImageFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setImages((prev) =>
          prev.map((img) => (img.id === imageFile.id ? { ...img, progress: 100, status: 'completed' as const } : img)),
        );

        // Check if all uploads are complete
        const updatedImages = images.map((img) =>
          img.id === imageFile.id ? { ...img, progress: 100, status: 'completed' as const } : img,
        );

        if (updatedImages.every((img) => img.status === 'completed')) {
          onUploadComplete?.(updatedImages);
        }
      } else {
        setImages((prev) => prev.map((img) => (img.id === imageFile.id ? { ...img, progress } : img)));
      }
    }, 100);
  };

  const addImages = useCallback(
    (files: FileList | File[]) => {
      const newImages: ImageFile[] = [];
      const newErrors: string[] = [];

      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(`${file.name}: ${error}`);
          return;
        }

        const imageFile: ImageFile = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: 'uploading',
        };

        newImages.push(imageFile);
      });

      if (newErrors.length > 0) {
        setErrors((prev) => [...prev, ...newErrors]);
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange?.(updatedImages);

        // Add new images to allImages for sorting
        const newSortableImages = newImages.map(createSortableImage);
        setAllImages((prev) => [...prev, ...newSortableImages]);

        // Simulate upload progress
        newImages.forEach((imageFile) => {
          simulateUpload(imageFile);
        });
      }
    },
    [images, maxSize, maxFiles, onImagesChange, createSortableImage],
  );

  const removeImage = useCallback(
    (id: string) => {
      // Remove from allImages
      setAllImages((prev) => prev.filter((img) => img.id !== id));

      // If it's an uploaded image, also remove from images array and revoke URL
      const uploadedImage = images.find((img) => img.id === id);
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage.preview);
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
    },
    [images],
  );

  const imageUploadZone = <Card onClick={openFileDialog}
    className={cn(
      "border-dashed shadow-none rounded-md transition-colors cursor-pointer hover:border-primary",
      isDragging
        ? "border-primary bg-primary/5"
        : "border-muted-foreground/25"
    )}
  // onDragEnter={handleDragEnter}
  // onDragLeave={handleDragLeave}
  // onDragOver={handleDragOver}
  // onDrop={handleDrop}
  >
    <CardContent className="text-center">
      <div className="flex items-center justify-center size-8 rounded-full border border-border mx-auto mb-3">
        <CloudUpload className="size-4" />
      </div>
      <h3 className="text-2sm text-foreground font-semibold mb-0.5">
        Choose a file or drag & drop here.
      </h3>
      <span className="text-xs text-secondary-foreground font-normal block mb-3">
        JPEG, PNG, up to {formatBytes(maxSize)}.
      </span>
    </CardContent>
  </Card>

  return (
    <div className={cn('w-full flex flex-col gap-5', className)}>

      <div className="grid grid-cols-6 gap-4">
        {allImages.map((item) => (
          <div key={item.id} className="flex items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 relative group border border-border hover:z-10 data-[dragging=true]:z-50 transition-all duration-200 hover:bg-accent/70">
            <img
              src={item.src}
              className="w-full aspect-square object-contain pointer-events-none"
              alt={item.alt}
            />
          </div>
        ))}

        {imageUploadZone}
      </div>


      {!allImages.length && imageUploadZone}

    </div>
  );
}
