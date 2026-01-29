import React, { useState, useEffect } from "react";

interface Testimonial {
  name: string;
  designation: string;
  avatar: string;
  content: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
  autoRotate?: boolean;
  interval?: number;
}

const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  testimonials,
  autoRotate = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, interval, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="relative">
      <div className="bg-light dark:bg-darkmode-light rounded-lg p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-20 h-20 rounded-full mb-6 object-cover"
          />
          <blockquote className="text-lg mb-6 italic">
            "{current.content}"
          </blockquote>
          <div>
            <div className="font-bold text-xl mb-1">{current.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {current.designation}
            </div>
          </div>
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex
                    ? "bg-primary dark:bg-darkmode-primary"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-darkmode-body rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-darkmode-light transition"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-darkmode-body rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-darkmode-light transition"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default TestimonialsSlider;
