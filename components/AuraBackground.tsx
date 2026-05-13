
import React from 'react';

const AuraBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E6E6FA, #D8CFFF, #C5C6FF)' }}
    >
      {/* Lavender Blob */}
      <div 
        className="aura-blob absolute -top-[15%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[140px] bg-purple-300/30 opacity-60"
      />
      {/* Peach/Indigo Blob */}
      <div 
        className="aura-blob-reverse absolute top-[15%] -right-[15%] w-[60%] h-[60%] rounded-full blur-[140px] bg-indigo-200/30 opacity-50"
      />
      {/* Mint Blob */}
      <div 
        className="aura-blob absolute -bottom-[15%] left-[10%] w-[65%] h-[65%] rounded-full blur-[140px] bg-blue-100/30 opacity-40"
      />
      {/* Soft Mauve Blob */}
      <div 
        className="aura-blob-reverse absolute bottom-[5%] right-[5%] w-[55%] h-[55%] rounded-full blur-[140px] bg-purple-200/40 opacity-50"
      />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
    </div>
  );
};

export default AuraBackground;
