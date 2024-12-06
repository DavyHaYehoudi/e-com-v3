import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const partners = [
  {
    id: 0,
    link: "https://marjoryclos.hubside.fr/",
    img: "/images/partner1.jpeg",
  },
  {
    id: 1,
    link: "https://www.lhccoiffuremariage.com/",
    img: "/images/partner2.jpeg",
  },
  {
    id: 2,
    link: "https://marjoryclos.hubside.fr/",
    img: "/images/partner3.jpeg",
  },
  {
    id: 3,
    link: "https://cindy-naturopathe.com/",
    img: "/images/partner4.jpeg",
  },
];

export function PartnerCards() {
  return (
    <section className="mb-10">
      <h2 className="text-center mb-6">
        Mes Partenaires
      </h2>
      <div className="flex justify-around flex-wrap gap-2">
        {partners.map((partner) => (
          <Card
            key={partner.id}
            className="hover:shadow-lg transition duration-300 w-72 h-72 flex flex-col items-center justify-center"
            style={{ background: "var(--bg-1)" }}
          >
            <CardHeader className="flex justify-center pt-4">
              <img
                src={partner.img}
                alt={`Partner ${partner.id}`}
                width={150}
                height={150}
                className="rounded-full"
              />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center">
              <CardTitle className="mt-4 dark text-dark">
                Partenaire {partner.id + 1}
              </CardTitle>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <a
                href={partner.link}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Voir le partenaire
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
