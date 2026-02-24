"use client";

interface ProductCardSkeletonProps {
  count?: number;
}

function SingleSkeleton() {
  return (
    <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden border border-brand-border shadow-md min-h-[320px] md:min-h-[420px] flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 flex-shrink-0" />

      {/* Content skeleton */}
      <div className="p-3 md:p-5 lg:p-6 flex flex-col flex-1">
        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-4 md:h-5 bg-gray-200 rounded-md mb-2 w-3/4" />
          <div className="h-4 md:h-5 bg-gray-200 rounded-md mb-3 w-1/2" />

          {/* Price skeleton */}
          <div className="h-6 md:h-8 bg-gray-200 rounded-md mb-3 w-1/3" />

          {/* Description skeleton */}
          <div className="h-3 md:h-4 bg-gray-100 rounded-md mb-1.5 w-full" />
          <div className="h-3 md:h-4 bg-gray-100 rounded-md mb-4 w-2/3" />
        </div>

        {/* Button skeleton */}
        <div className="h-10 md:h-12 bg-gray-200 rounded-lg md:rounded-xl w-full" />
      </div>
    </div>
  );
}

export default function ProductCardSkeleton({ count = 8 }: ProductCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SingleSkeleton key={index} />
      ))}
    </>
  );
}

// Skeleton para el carousel
export function CarouselSkeleton({ count = 5 }: ProductCardSkeletonProps) {
  return (
    <div className="flex space-x-4 md:space-x-5 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]">
          <SingleSkeleton />
        </div>
      ))}
    </div>
  );
}
