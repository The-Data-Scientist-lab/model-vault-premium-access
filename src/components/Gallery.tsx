
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type GalleryProps = {
  images: string[];
};

const Gallery = ({ images }: GalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setViewMode('slideshow');
  };

  return (
    <div className="w-full">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer card-hover"
              onClick={() => handleImageClick(index)}
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img 
              src={images[currentIndex]} 
              alt={`Gallery image ${currentIndex + 1}`} 
              className="w-full h-full object-contain bg-black"
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setViewMode('grid')}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80 transition"
            >
              Back to Gallery
            </button>
            
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevious}
                className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
