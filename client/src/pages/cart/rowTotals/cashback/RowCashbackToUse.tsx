import { TableCell, TableRow } from "@/components/ui/table";
import CashbackToUse from "./CashbackToUse";
import { formatPrice } from "@/utils/pricesFormat";

interface RowCashbackToUseProps {
  onCashbackSelect: (amount: number) => void;
  selectedCashback: number | null; // null si aucun cashback sélectionné ici pour l'instant.
}
const RowCashbackToUse: React.FC<RowCashbackToUseProps> = ({
  onCashbackSelect,
  selectedCashback,
}) => {
  return (
    <TableRow>
      <CashbackToUse onCashbackSelect={onCashbackSelect} />
      <TableCell className="text-right bg-white dark bg-dark whitespace-nowrap">
        {selectedCashback ? (
          <span className="whitespace-nowrap text-green-500">
            - {formatPrice(selectedCashback)}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowCashbackToUse;
