import { CashBackHistoryResponse } from "../../../../hooks/dashboard/customer/useCustomerInfo";
import { FolderInput, FolderOutput, BadgeEuro } from "lucide-react";
import { formatPrice } from "@/utils/pricesFormat";
import { Separator } from "@/components/ui/separator";

interface CashbackSummaryProps {
  history: CashBackHistoryResponse | null;
}

const CashbackSummary: React.FC<CashbackSummaryProps> = ({ history }) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 2xl:gap-16">
      {/* Section 1 */}
      <div className="flex items-center gap-2 bg-green-500 text-[var(--whiteSmoke)] p-5 rounded-xl flex-grow">
        <FolderInput className="w-16 h-16" />
        <p>
          Cashback
          <br /> capitalisé :{" "}
          <span className="font-bold">
            {history ? formatPrice(history.total_earned) : "N.C."}
          </span>
        </p>
      </div>
      {/* Séparateur vertical */}
      <Separator
        orientation="vertical"
        className="hidden 2xl:block h-16 border-2"
      />
      {/* Section 2 */}
      <div className="flex items-center gap-2  bg-red-500 text-[var(--whiteSmoke)] p-5 rounded-xl flex-grow">
        <FolderOutput className="w-16 h-16" />
        <p>
          Cashback
          <br /> dépensé :{" "}
          <span className="font-bold">
            {history ? formatPrice(history.total_spent) : "N.C."}
          </span>
        </p>
      </div>
      {/* Séparateur vertical */}
      <Separator
        orientation="vertical"
        className="hidden 2xl:block h-16 border-2"
      />
      {/* Section 3 */}
      <div className="flex items-center gap-2  bg-blue-500 text-[var(--whiteSmoke)] p-5 rounded-xl flex-grow">
        <BadgeEuro className="w-16 h-16" />
        <p>
          Cashback
          <br /> disponible :{" "}
          <span className="font-bold">
            {" "}
            {history
              ? formatPrice(history.total_earned - history.total_spent)
              : "N.C."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CashbackSummary;
