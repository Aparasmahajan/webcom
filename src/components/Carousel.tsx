import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { newsItems } from '../data/constants';

const Carousel: React.FC = () => {
  const slides = useMemo(() => {
    if (newsItems.length === 0) return [] as typeof newsItems;
    if (newsItems.length === 1) return [...newsItems];
    const first = newsItems[0];
    const last = newsItems[newsItems.length - 1];
    return [last, ...newsItems, first];
  }, []);

  const [currentIndex, setCurrentIndex] = useState(newsItems.length > 1 ? 1 : 0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number>(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const effectiveIndex = useMemo(() => {
    if (newsItems.length === 0) return 0;
    if (newsItems.length === 1) return 0;
    return (currentIndex - 1 + newsItems.length) % newsItems.length;
  }, [currentIndex]);

  useEffect(() => {
    const updateWidth = () => setContainerWidth(containerRef.current?.clientWidth || 0);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (newsItems.length <= 1) return;
    const interval = setInterval(() => {
      if (!isDragging) {
        goToNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const enableTransitionAnd = (fn: () => void) => {
    setIsTransitionEnabled(true);
    fn();
  };

  const goToSlide = (index: number) => {
    if (newsItems.length <= 1) return;
    enableTransitionAnd(() => setCurrentIndex(index + 1));
  };

  const goToPrevious = () => {
    if (newsItems.length <= 1) return;
    enableTransitionAnd(() => setCurrentIndex((prev) => prev - 1));
  };

  const goToNext = () => {
    if (newsItems.length <= 1) return;
    enableTransitionAnd(() => setCurrentIndex((prev) => prev + 1));
  };

  const handleTransitionEnd = () => {
  if (newsItems.length <= 1) return;
  const lastIndex = slides.length - 1;

  if (currentIndex <= 0) {
    setIsTransitionEnabled(false);
    setCurrentIndex(slides.length - 2);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsTransitionEnabled(true))
    );
  } else if (currentIndex >= lastIndex) {
    setIsTransitionEnabled(false);
    setCurrentIndex(1);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsTransitionEnabled(true))
    );
  }
};


  const startDrag = (clientX: number) => {
    if (newsItems.length <= 1) return;
    setIsDragging(true);
    setIsTransitionEnabled(false);
    dragStartXRef.current = clientX;
    setDragOffsetX(0);
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStartXRef.current;
    setDragOffsetX(delta);
  };

  const endDrag = () => {
  if (!isDragging) return;
  const threshold = Math.max(50, containerWidth * 0.15);
  const delta = dragOffsetX;

  setIsDragging(false);
  setIsTransitionEnabled(true);
  setDragOffsetX(0);

  if (newsItems.length <= 1) return;

  if (Math.abs(delta) > threshold) {
    // move one slide left/right
    setCurrentIndex((prev) => prev + (delta < 0 ? 1 : -1));
  } else {
    // snap back to current slide
    setCurrentIndex((prev) => prev);
  }
};


  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  };
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => moveDrag(e.clientX);
  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = () => endDrag();
  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => endDrag();

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => startDrag(e.touches[0].clientX);
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => moveDrag(e.touches[0].clientX);
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => endDrag();

  const dragPercent = newsItems.length > 1 && containerWidth > 0 ? (dragOffsetX / containerWidth) * 100 : 0;

  if (newsItems.length === 0) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-xl bg-gray-100 flex items-center justify-center">
        <span className="text-gray-500">No news available</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-xl select-none"
      style={{ touchAction: 'pan-y' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`flex h-full transform-gpu will-change-transform ${
          isTransitionEnabled ? 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]' : 'transition-none'
        }`}
        style={{ transform: `translate3d(${(-(newsItems.length > 1 ? currentIndex : 0) * 100 + dragPercent).toFixed(4)}%, 0, 0)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {(slides.length > 0 ? slides : newsItems).map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="shrink-0 grow-0 basis-full h-full"
            style={{ backgroundColor: item.backgroundColor }}
          >
            {(() => {
              const hasTitle = Boolean((item as any).title && String((item as any).title).trim());
              const hasDescription = Boolean((item as any).description && String((item as any).description).trim());
              const hasImage = Boolean((item as any).image);
              const isTitleLeft = (item as any).isTitleLeft ?? true;

              if (hasImage && !hasTitle && !hasDescription) {
                return (
                  <div className="flex h-full">
                    <img
                      src={(item as any).image}
                      alt={hasTitle ? String((item as any).title) : `Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                );
              }

              if (!hasImage && (hasTitle || hasDescription)) {
                return (
                  <div className="flex h-full items-center justify-center p-6 sm:p-8">
                    <div className="max-w-2xl text-center">
                      {hasTitle && (
                        <h2
                          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight"
                          style={{ color: (item as any).titleTextColor || '#FFFFFF' }}
                        >
                          {(item as any).title}
                        </h2>
                      )}
                      {hasDescription && (
                        <p
                          className="text-base sm:text-lg leading-relaxed mx-auto max-w-prose"
                          style={{ color: (item as any).descriptionTextColor || '#E5E7EB' }}
                        >
                          {(item as any).description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div className={`flex h-full flex-col ${isTitleLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:flex-1 p-6 sm:p-8 flex flex-col justify-center">
                    {hasTitle && (
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight"
                        style={{ color: (item as any).titleTextColor || '#FFFFFF' }}
                      >
                        {(item as any).title}
                      </h2>
                    )}
                    {hasDescription && (
                      <p
                        className="text-base sm:text-lg leading-relaxed max-w-md"
                        style={{ color: (item as any).descriptionTextColor || '#E5E7EB' }}
                      >
                        {(item as any).description}
                      </p>
                    )}
                  </div>
                  {hasImage && (
                    <div className="md:flex-1 relative h-48 sm:h-64 md:h-auto">
                      <img
                        src={(item as any).image}
                        alt={hasTitle ? String((item as any).title) : `Slide ${index + 1}`}
                        className="w-full h-full object-cover md:opacity-80"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="hidden sm:flex items-center justify-center absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="hidden sm:flex items-center justify-center absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      {newsItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === effectiveIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;