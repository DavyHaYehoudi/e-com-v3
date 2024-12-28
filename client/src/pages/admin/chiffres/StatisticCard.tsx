import React from "react";

interface StatisticCardProps {
  title: string;
  value: number | string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 shadow-md rounded-lg p-4 text-center">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatisticCard;
