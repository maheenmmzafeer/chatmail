import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b141a] focus:ring-[#00a884]";
  
  const variants = {
    primary: "bg-[#00a884] hover:bg-[#008f6f] text-white shadow-lg shadow-[#00a884]/20",
    secondary: "bg-[#202c33] hover:bg-[#2a3942] text-[#e9edef] border border-white/5",
    outline: "bg-transparent border border-[#00a884] text-[#00a884] hover:bg-[#00a884]/10",
  };
  
  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-[15px]",
    lg: "px-8 py-3 text-lg",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
