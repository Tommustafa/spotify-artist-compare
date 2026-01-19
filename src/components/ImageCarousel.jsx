import { useState, useEffect } from 'react';

export default function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev >= images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images]);

  // Reset index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="carousel-image placeholder">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="image-carousel">
      <div className="carousel-images">
        {images.map((image, index) => (
          <img
            key={image.url}
            src={image.url}
            alt={`Artist image ${index + 1}`}
            className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
