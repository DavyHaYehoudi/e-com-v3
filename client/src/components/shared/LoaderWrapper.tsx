import { ClipLoader } from "react-spinners";
import React from "react";

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
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <p>Une erreur s&apos;est produite </p>;
  }

  return <>{children}</>;
};

export default LoaderWrapper;
