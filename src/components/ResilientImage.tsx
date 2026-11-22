import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  ...props
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B323D] to-[#124857] text-white/80 p-6 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || 'Injaz Builders visual'}
      >
        <Building2 className="w-8 h-8 text-[#7AB8E5] mb-2" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-white/90">
          {fallbackTitle || alt || 'Injaz Builders'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading={props.loading ?? 'lazy'}
      {...props}
    />
  );
};
