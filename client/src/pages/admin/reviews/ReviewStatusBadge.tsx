import NoValidBadge from "@/components/shared/badge/NoValidBadge";
import PendingBadge from "@/components/shared/badge/PendingBadge";
import ValidBadge from "@/components/shared/badge/ValidBadge";

interface ReviewStatusBadgeProps {
  status: "approved" | "pending" | "refused";
}

const ReviewStatusBadge: React.FC<ReviewStatusBadgeProps> = ({ status }) => {
  const statusComponents = {
    approved: <ValidBadge label="Approved" />,
    pending: <PendingBadge label="Pending" />,
    refused: <NoValidBadge label="Refused" />,
  };

  return statusComponents[status] || null; // Affiche le composant approprié ou rien si le statut est invalide
};

export default ReviewStatusBadge;
