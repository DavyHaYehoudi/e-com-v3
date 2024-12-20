import { Button } from "../ui/button";

interface CancelBtnDashboardProps {
  label?: string;
  onCancel: () => void;
}
const CancelBtnDashboard: React.FC<CancelBtnDashboardProps> = ({
  label = "annuler",
  onCancel,
}) => {
  return (
    <Button
      type="button"
      onClick={() => onCancel()}
      className="text-sm text-red-500 hover:underline bg-slate-200 capitalize"
    >
      {label}
    </Button>
  );
};

export default CancelBtnDashboard;
