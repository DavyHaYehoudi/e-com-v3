import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStatistic from "@/hooks/dashboard/admin/useStatistic";
import { StatsResponse } from "@/types/StatisticTypes";
import { formatPrice } from "@/utils/pricesFormat";
import StatAllYearBadge from "@/components/shared/badge/chiffres/StatAllYear";
import StatYearBadge from "@/components/shared/badge/chiffres/StatYear";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

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
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 md:space-y-8">
      {/* Year Selector */}
      <div>
        <Select
          value={year.toString()}
          onValueChange={(value) => setYear(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une année" />
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Orders Block */}
          <div className="p-6 rounded-lg shadow-md bg-indigo-100 text-indigo-900 dark:bg-indigo-700 dark:text-indigo-100">
            <h2 className="text-xl font-semibold mb-4">Commandes</h2>
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant des commandes :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>
                  {formatPrice(statistics.orders.totalAmountOrdersByYear)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre de commandes :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>{statistics.orders.totalOrdersByYear}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant total des commandes :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>
                  {formatPrice(statistics.orders.totalAmountOrdersAllTime)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre total des commandes :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.orders.totalOrdersAllTime}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
          </div>

          {/* Products Block */}
          <div className="p-6 rounded-lg shadow-md bg-green-100 text-green-900 dark:bg-green-700 dark:text-green-100">
            <h2 className="text-xl font-semibold mb-4">Produits</h2>
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre de produits vendus :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>{statistics.products.totalSalesProductsByYear}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre d'articles vendus :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>{statistics.products.totalSalesArticlesByYear}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre total de produits vendus :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.products.totalSalesProductsAllTime}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre total d'articles vendus :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.products.totalSalesArticlesAllTime}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
          </div>

          {/* Gift Cards Block */}
          <div className="p-6 rounded-lg shadow-md bg-yellow-100 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100">
            <h2 className="text-xl font-semibold mb-4">Cartes cadeaux</h2>
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre de cartes cadeaux émises :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>{statistics.giftCards.totalGiftcardsByYear}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant acheté :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>
                  {formatPrice(statistics.giftCards.totalAmountBalanceByYear)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant utilisé :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>
                  {formatPrice(statistics.giftCards.totalAmountUsedByYear)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre de cartes cadeaux actives :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.giftCards.activeGiftcards}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre de cartes cadeaux inactives :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.giftCards.inactiveGiftcards}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Nombre total de cartes cadeaux émises :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.giftCards.totalGiftcardsAllTime}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant total utilisé :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>{statistics.giftCards.totalAmountUsedAllTime}</strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant total acheté :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>
                  {formatPrice(statistics.giftCards.totalAmountBalanceAllTime)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex justify-end items-center gap-2 flex-wrap m-4">
              Montant encore utilisable :{" "}
              <strong>
                {formatPrice(statistics.giftCards.totalAmountAvailable)}
              </strong>
            </p>
          </div>

          {/* Cashback Block */}
          <div className="p-6 rounded-lg shadow-md bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-blue-100">
            <h2 className="text-xl font-semibold mb-4">Cashback</h2>
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant du cashback capitalisé :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>
                  {formatPrice(statistics.cashback.totalCashbackEarnedByYear)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant du cashback utilisé :{" "}
              <div className="flex items-center gap-2">
                <StatYearBadge year={year} />
                <strong>
                  {formatPrice(statistics.cashback.totalCashbackSpentByYear)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant total du cashback capitalisé :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>
                  {formatPrice(statistics.cashback.totalCashbackEarnedAllTime)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex items-center justify-between gap-2 flex-wrap">
              Montant total du cashback utilisé :{" "}
              <div className="flex items-center gap-2">
                <StatAllYearBadge />
                <strong>
                  {formatPrice(statistics.cashback.totalCashbackSpentAllTime)}
                </strong>
              </div>
            </p>
            <hr className="mb-4 border-gray-300" />
            <p className="mb-2 flex justify-end items-center gap-2 flex-wrap m-4">
              Montant encore utilisable :{" "}
              <strong>
                {formatPrice(statistics.cashback.totalCashbackUsable)}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticPage;
