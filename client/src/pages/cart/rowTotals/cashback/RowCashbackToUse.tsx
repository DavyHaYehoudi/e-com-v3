import { TableCell, TableRow } from "@/components/ui/table";
import CashbackToUse from "./CashbackToUse";
import { formatPrice } from "@/utils/pricesFormat";

interface RowCashbackToUseProps {
  cashbackToSpend: number | null; // null si aucun cashback sélectionné ici pour l'instant.
}
const RowCashbackToUse: React.FC<RowCashbackToUseProps> = ({
  cashbackToSpend,
}) => {
  return (
    <TableRow>
      <CashbackToUse />
      <TableCell className="text-right bg-white dark bg-dark whitespace-nowrap">
        {cashbackToSpend ? (
          <span className="whitespace-nowrap text-green-500">
            - {formatPrice(cashbackToSpend)}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowCashbackToUse;
