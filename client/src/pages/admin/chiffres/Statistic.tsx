import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStatistic from "@/hooks/dashboard/admin/useStatistic";
import { StatsResponse } from "@/types/chiffres/StatisticTypes";
import { formatPrice } from "@/utils/pricesFormat";

const StatisticPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [statistics, setStatistics] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getStatistic } = useStatistic(year.toString());

  useEffect(() => {
    setIsLoading(true);
    getStatistic(year).then((result) => {
      if (result) setStatistics(result);
      setIsLoading(false);
    });
  }, [getStatistic, year]);

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }
  return (
    <div className="p-4 space-y-4">
      {/* Year Selector */}
      <div>
        <Select
          value={year.toString()}
          onValueChange={(value) => setYear(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statistics Grid */}
      {statistics && (
        <div className="xl:w-1/2 mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Orders Block */}
          <div className="p-6 rounded-lg shadow-md bg-pink-100 text-pink-900 dark:bg-pink-700 dark:text-pink-100">
            <h2 className="text-xl font-semibold mb-4">Commandes</h2>
            <p className="mb-2">
              Montant total des commandes :{" "}
              <strong>{formatPrice(statistics.orders.totalAmount)}</strong>
            </p>
            <p>
              Nombre de commandes :{" "}
              <strong>{statistics.orders.totalOrders}</strong>
            </p>
          </div>

          {/* Products Block */}
          <div className="p-6 rounded-lg shadow-md bg-green-100 text-green-900 dark:bg-green-700 dark:text-green-100">
            <h2 className="text-xl font-semibold mb-4">Produits</h2>
            <p>
              Nombre total de produits vendus :{" "}
              <strong>{statistics.products.totalSales} article(s)</strong>
            </p>
          </div>

          {/* Gift Cards Block */}
          <div className="p-6 rounded-lg shadow-md bg-yellow-100 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100">
            <h2 className="text-xl font-semibold mb-4">Cartes cadeaux</h2>
            <p className="mb-2">
              Nombre total de cartes cadeaux émises :{" "}
              <strong>{statistics.giftCards.totalGiftCards}</strong>
            </p>
            <p className="mb-2">
              Nombre de cartes cadeaux toujours en cours :{" "}
              <strong>{statistics.giftCards.activeGiftCards}</strong>
            </p>
            <p className="mb-2">
              Nombre de cartes cadeaux inactives :{" "}
              <strong>{statistics.giftCards.inactiveGiftCards}</strong>
            </p>
            <p className="mb-2">
              Montant total utilisé :{" "}
              <strong>
                {formatPrice(statistics.giftCards.totalAmountUsed)}
              </strong>
            </p>
            <p>
              Montant total à utiliser :{" "}
              <strong>
                {formatPrice(statistics.giftCards.totalAmountAvailable)}
              </strong>
            </p>
          </div>

          {/* Cashback Block */}
          <div className="p-6 rounded-lg shadow-md bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-blue-100">
            <h2 className="text-xl font-semibold mb-4">Cashback</h2>
            <p className="mb-2">
              Montant total du cashback capitalisé :{" "}
              <strong>
                {formatPrice(statistics.cashback.totalCashbackEarned)}
              </strong>
            </p>
            <p className="mb-2">
              Montant total du cashback utilisé :{" "}
              <strong>
                {formatPrice(statistics.cashback.totalCashbackSpent)}
              </strong>
            </p>
            <p className="mb-2">
              Montant total du cashback encore utilisable :{" "}
              <strong>
                {formatPrice(
                  statistics.cashback.totalCashbackEarned -
                    statistics.cashback.totalCashbackSpent
                )}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticPage;
