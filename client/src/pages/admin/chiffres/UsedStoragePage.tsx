import { Progress } from "@/components/ui/progress";
import useStorageDataFirebase from "@/hooks/dashboard/admin/useStorageDataFirebase";

const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 5 * 1024 * 1024 * 1024; // 5 Go en octets
  return ((sizeInBytes / totalSizeInBytes) * 100).toFixed(2);
};

const formatSize = (size: number) => {
  if (size < 1024) return `${size} octets`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} Ko`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} Mo`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} Go`;
};

const UsedStoragePage = () => {
  const { statsProducts } = useStorageDataFirebase();
  const { totalImagesProducts, totalSizeProducts } = statsProducts;

  const percentage = parseFloat(calculatePercentage(totalSizeProducts));
  const remainingSpace = 5 * 1024 * 1024 * 1024 - totalSizeProducts;
  const averageImageSize =
    totalImagesProducts > 0 ? totalSizeProducts / totalImagesProducts : 0;
  const estimatedRemainingImages = Math.floor(
    remainingSpace / averageImageSize
  );

  return (
    <div className="container mx-auto p-6 space-y-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Espace de stockage utilise</h2>
      <p>
        <strong>Nombre d'images stockées :</strong>
        <span className="text-blue-500 mx-2">{totalImagesProducts}</span>{" "}
        {`(${formatSize(totalSizeProducts)})`}
      </p>
      <p>
        <strong>Espace disponible pour : </strong>
        <span className="text-blue-500 mx-2">{`${estimatedRemainingImages} `}</span>
        <span>images 🏞️ ({formatSize(remainingSpace)})</span>
      </p>

      {/* Barre de progression ShadCN UI */}
      <Progress
        value={percentage}
        className="w-full bg-gray-200 progress-bar"
        indicatorColor="bg-green-500"
      />
      <p className="text-sm text-gray-500">{percentage}% utilisé</p>
    </div>
  );
};

export default UsedStoragePage;
