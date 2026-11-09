import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  sizeClass?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  sizeClass = 'h-[46px] sm:h-[52px] md:h-[58px] lg:h-[62px]',
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Uploaded Brand Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/assets/aistudio/file_00000000b4448211a3c0611cc76f6121_fce29dfa.png"
          alt="QR Code Generator Official Logo"
          className={`${sizeClass} w-auto aspect-square object-contain drop-shadow-md rounded-full transition-transform duration-200 group-hover:scale-105`}
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            <span className="text-sm sm:text-lg lg:text-xl font-black tracking-tight whitespace-nowrap">
              QR Code <span className="text-blue-600 dark:text-blue-400">Generator</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
              PRO
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] md:text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide whitespace-nowrap">
            Create • Customize • Download
          </span>
        </div>
      )}
    </div>
  );
};
