// components/ui/FullscreenLoader.tsx

import LoadingSpinner from "./LoadingSpinner";

const FullscreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-white">
        <LoadingSpinner />
        <span>Chargement en cours...</span>
      </div>
    </div>
  );
};

export default FullscreenLoader;
