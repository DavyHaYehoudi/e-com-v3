import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rewards } from "./data";

const RewardList = () => {
  return (
    <div className="p-6">
      {/* Titre principal */}
      <h2 className="text-2xl font-bold text-center mb-8">
        Vos recompenses disponibles 🎉
      </h2>
      <p className="text-center text-gray-600 mb-10 dark:text-[var(--whiteSmoke)]">
        Découvrez toutes les façons dont vous pouvez gagner du cashback sur
        notre plateforme. Que ce soit pour vos achats réguliers, vos avis
        laissés ou encore votre anniversaire, nous avons une récompense pour
        vous !
      </p>

      {/* Liste des récompenses */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge
                  className={`py-1 px-3 rounded-lg text-sm ${reward.color}`}
                >
                  {reward.title}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-[var(--whiteSmoke)]">
                {reward.description}
              </p>
            </CardContent> 
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardList;
