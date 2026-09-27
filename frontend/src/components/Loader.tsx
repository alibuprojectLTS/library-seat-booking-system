import React from 'react';

const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  const spinner = (
    <div className="relative flex items-center justify-center">
      {/* Spinning ring */}
      <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      {/* Book emoji centered */}
      <span className="absolute text-2xl">📚</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-10">{spinner}</div>;
};

export default Loader;