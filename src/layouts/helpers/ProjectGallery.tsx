import React, { useState, useEffect, useCallback } from "react";

interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Focus trap
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [lightboxOpen]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="md:col-4 mb-4">
            <button
              onClick={() => openLightbox(index)}
              className="block w-full cursor-pointer hover:opacity-90 transition"
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Close lightbox"
          >
            &times;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 z-10"
            aria-label="Next image"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
