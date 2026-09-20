const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  const spinner = (
    <div className="w-32 h-32 rounded-full border-4 border-blue-300 flex items-center justify-center animate-pulse shadow-lg">
      <span className="text-3xl">📚</span>
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