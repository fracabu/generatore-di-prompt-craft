import React from 'react';
import './Button3D.css';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'red' | 'green' | 'orange' | 'blue' | 'sky' | 'indigo' | 'slate';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button3D: React.FC<Button3DProps> = ({ 
  children, 
  onClick, 
  variant = 'blue', 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'red':
        return {
          shadow: 'bg-red-900/25',
          edge: 'bg-gradient-to-l from-red-950 via-red-800 to-red-950',
          front: 'bg-red-600'
        };
      case 'green':
        return {
          shadow: 'bg-green-900/25',
          edge: 'bg-gradient-to-l from-green-950 via-green-700 to-green-950',
          front: 'bg-green-600'
        };
      case 'orange':
        return {
          shadow: 'bg-orange-900/25',
          edge: 'bg-gradient-to-l from-orange-950 via-orange-700 to-orange-950',
          front: 'bg-orange-600'
        };
      case 'blue':
        return {
          shadow: 'bg-blue-900/25',
          edge: 'bg-gradient-to-l from-blue-950 via-blue-700 to-blue-950',
          front: 'bg-blue-600'
        };
      case 'sky':
        return {
          shadow: 'bg-sky-900/25',
          edge: 'bg-gradient-to-l from-sky-950 via-sky-700 to-sky-950',
          front: 'bg-sky-600'
        };
      case 'indigo':
        return {
          shadow: 'bg-indigo-900/25',
          edge: 'bg-gradient-to-l from-indigo-950 via-indigo-700 to-indigo-950',
          front: 'bg-indigo-600'
        };
      case 'slate':
        return {
          shadow: 'bg-slate-900/25',
          edge: 'bg-gradient-to-l from-slate-950 via-slate-700 to-slate-950',
          front: 'bg-slate-600'
        };
      default:
        return {
          shadow: 'bg-blue-900/25',
          edge: 'bg-gradient-to-l from-blue-950 via-blue-700 to-blue-950',
          front: 'bg-blue-600'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`pushable-3d relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-filter duration-250 hover:brightness-110 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span 
        className={`shadow-3d absolute top-0 left-0 w-full h-full rounded-xl ${variantClasses.shadow}`}
        style={{ 
          transform: 'translateY(2px)',
          transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
          willChange: 'transform'
        }}
      />
      <span 
        className={`edge-3d absolute top-0 left-0 w-full h-full rounded-xl ${variantClasses.edge}`}
      />
      <span 
        className={`front-3d relative block px-6 py-3 rounded-xl text-white font-semibold ${variantClasses.front}`}
        style={{ 
          transform: 'translateY(-4px)',
          transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
          willChange: 'transform'
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default Button3D;