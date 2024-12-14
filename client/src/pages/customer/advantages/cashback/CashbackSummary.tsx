import { FolderInput, FolderOutput, BadgeEuro } from "lucide-react";
import { formatPrice } from "@/utils/pricesFormat";
import { Separator } from "@/components/ui/separator";
import { CashbackInCustomerDB } from "@/types/customer/CustomerTypes";

interface CashbackSummaryProps {
  history: CashbackInCustomerDB[] | null;
}

const CashbackSummary: React.FC<CashbackSummaryProps> = ({ history }) => {
  const totalCashbackEarned =
    history &&
    history.length > 0 &&
    history.reduce((acc, b) => acc + b.cashbackEarned, 0);
  const totalCashbackSpent =
    history &&
    history.length > 0 &&
    history.reduce((acc, b) => acc + b.cashbackSpent, 0);
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 2xl:gap-16">
      {/* Section 1 */}
      <div className="flex items-center gap-2 bg-green-500 text-[var(--whiteSmoke)] p-5 rounded-xl flex-grow">
        <FolderInput className="w-16 h-16" />
        <p>
          Cashback
          <br /> capitalisé :{" "}
          <span className="font-bold">
            {typeof totalCashbackEarned === "number"
              ? formatPrice(totalCashbackEarned)
              : "N.C."}
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
            {typeof totalCashbackSpent === "number"
              ? formatPrice(totalCashbackSpent)
              : "N.C."}
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
            {typeof totalCashbackEarned === "number" &&
            typeof totalCashbackSpent === "number"
              ? formatPrice(totalCashbackEarned - totalCashbackSpent)
              : "N.C."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CashbackSummary;
