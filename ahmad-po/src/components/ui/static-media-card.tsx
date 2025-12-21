'use client';

import { ReactNode } from 'react';

interface StaticMediaCardProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  date?: string;
  children?: ReactNode;
  className?: string;
}

const StaticMediaCard = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  title,
  date,
  children,
  className = '',
}: StaticMediaCardProps) => {
  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-gray-900">
        {mediaType === 'video' ? (
          <video
            src={mediaSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover"
          />
        ) : (
          <img
            src={mediaSrc}
            alt={title || 'Media content'}
            className="w-full h-auto object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {date && (
            <p className="text-xl text-blue-200 mb-2">
              {date}
            </p>
          )}
          
          {title && (
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {title}
            </h3>
          )}
          
          <div className="text-blue-200 text-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticMediaCard;