import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <div className={`flex flex-col space-y-4 mb-12 ${alignClass}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#e9edef]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[#8696a0] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
