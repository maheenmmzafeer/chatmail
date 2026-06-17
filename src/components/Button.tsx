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
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-2 focus:ring-offset-[var(--bg)]';

  const variants = {
    primary: 'bg-[var(--accent)] text-white shadow-[var(--shadow-glow)] hover:bg-[var(--accent-light)] active:scale-[0.98]',
    secondary: 'border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text)] hover:bg-[var(--bg-hover)] active:scale-[0.98]',
    outline: 'border border-[var(--accent)]/30 bg-transparent text-[var(--accent-light)] hover:bg-[var(--accent)]/10 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-base',
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
