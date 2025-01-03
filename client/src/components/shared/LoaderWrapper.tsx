// import { ClipLoader } from "react-spinners";
import LoadingSpinner from "./LoadingSpinner";

interface LoaderWrapperProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner/>
        <span> Chargement en cours...</span>
      </div>
    );
  }

  if (error) {
    return <p>Une erreur s&apos;est produite </p>;
  }

  return <>{children}</>;
};

export default LoaderWrapper;
