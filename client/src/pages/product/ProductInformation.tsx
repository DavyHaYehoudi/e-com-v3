import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Truck, Clock, Box, Shield } from "lucide-react"; // Exemples d'icônes Lucide
import Image from "next/image";
import Link from "next/link";

const ProductInformation = () => {
  return (
    <section className="bg-[var(--bg-1)] py-8 m-2">
      <h2 className="text-center text-2xl uppercase mb-8 dark:text-[var(--dark-mode-black)]">
        <span className="text-base text-[var(--golden-1)]">
          atelier noralya
        </span>{" "}
        <br /> Informations
      </h2>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonne de gauche avec les accordéons */}
        <div className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="flex items-center dark:text-[var(--dark-mode-black)]">
                  <Box className="mx-2" /> Fabrication des produits
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <article className="p-6 bg-white dark:text-[var(--whiteSmoke)] bg-dark">
                  Les bijoux sont fabriqués avec délicatesse dans mon atelier
                  provençal.
                </article>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span className="flex items-center text-[var(--dark-mode-black)]">
                  {" "}
                  <Truck className="mx-2" /> Livraison & retour
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <article className="p-6 bg-white dark:text-[var(--whiteSmoke)] bg-dark">
                  Standard : 2 à 4 jours ouvrés
                  <br />
                  <br />
                  Possibilité de choisir une livraison avec remise en main
                  propre et assurance perte/vol.
                  <br />
                  <br />
                  Vous avez changé d'avis? Vous disposez d'un délai légal de 14
                  jours pour nous renvoyer le produit.
                  <br />
                  <br />
                  <span className="text-red-600 italic">
                    Pour des questions d'hygiène, les boucles d'oreilles ne sont
                    ni reprises, ni échangées.
                  </span>{" "}
                  <br />
                  <Link
                    href="/conditions-generales-de-vente"
                    className="flex justify-center text-blue-500 m-2 underline"
                  >
                    Voir les conditions générales de vente
                  </Link>
                </article>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <span className="flex items-center text-[var(--dark-mode-black)]">
                  {" "}
                  <Clock className="mx-2" /> Délais de confection
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <article className="p-6 bg-white dark:text-[var(--whiteSmoke)] bg-dark">
                  Les bijoux sont confectionnés à la main dès la validation de
                  la commande et nécessite un délai de fabrication compris entre
                  5 et 10 jours.
                  <br />
                  <br />
                  Si vous êtes pris par le temps, n'hésitez pas à m'envoyer un
                  message à l'adresse suivante : bonjour@ateliernoralya.com
                  <br />
                  <br />
                  Nous verrons ensemble s'il est possible de réduire le temps
                  d'attente.
                  <br />
                </article>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <span className="flex items-center text-[var(--dark-mode-black)]">
                  <Shield className="mx-2" /> Guide d'entretien
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <article className="p-6 bg-white dark:text-[var(--whiteSmoke)] bg-dark">
                  <h2 className="text-2xl font-bold mb-4">Le Gold Filled</h2>
                  <p className="mb-4">
                    Le Gold Filled est une ancienne technique qui consiste à
                    recouvrir d'une épaisse couche d’or de 14 carats, une base
                    en laiton. Il est hypoallergénique et peut se porter sous
                    l'eau.
                  </p>
                  <p className="mb-4 italic">
                    Vous cherchiez le côté "Something Old" ? Le Gold-Filled est
                    de l'or recyclé !
                  </p>
                  <p className="mb-4">
                    Afin de maintenir son bel éclat doré, vous pouvez nettoyer
                    délicatement votre bijou à l'eau, avec un savon doux et une
                    chamoisine.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    Les Perles D'Eau Douce
                  </h2>
                  <p className="mb-4">
                    Ces magnifiques beautés de la nature doivent être préservées
                    au mieux. Je vous conseille de commencer à vous maquiller, à
                    vous parfumer et à vous coiffer avant de mettre vos bijoux.
                    Ainsi, les perles seront protégées.
                  </p>
                  <p className="mb-4">
                    Les ranger dans leurs écrins les empêchera de se rayer avec
                    d'autres bijoux. Vous pouvez nettoyer délicatement vos
                    perles avec un tissu humide car celles-ci apprécient l'eau.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">
                    L'Argent Massif 925
                  </h2>
                  <p className="mb-4">
                    L'argent massif est composé de 92,5 % d'argent pur et de 7,5
                    % de cuivre. Le fait que l'argent noircisse au fil du temps
                    est tout à fait naturel.
                  </p>
                  <p className="mb-4">
                    Afin de préserver au mieux l'éclat de votre bijou voici
                    quelques conseils :
                  </p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Les ranger dans leurs écrins</li>
                    <li>
                      Éviter de les entreposer dans des pièces humides comme la
                      salle de bain
                    </li>
                    <li>
                      Les retirer lors du sport, sous la douche, ou à la mer
                    </li>
                    <li>
                      Les nettoyer régulièrement avec une chamoisine propre pour
                      qu'ils gardent leur brillance
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">Le Plaqué Or</h2>
                  <p className="mb-4">
                    Les bijoux en plaqué or proposés ici sont recouverts d'or de
                    18 carats sur 3 microns. Le plaqué or a tendance à ternir
                    avec le temps si un nettoyage régulier n'est pas fait.
                  </p>
                  <p className="mb-4">
                    Afin de préserver au mieux l'éclat de votre bijou voici
                    quelques conseils :
                  </p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Les ranger dans leurs écrins</li>
                    <li>
                      Les retirer lors du sport, sous la douche, ou à la mer
                    </li>
                    <li>
                      Les nettoyer régulièrement avec une chamoisine propre pour
                      qu'ils gardent leur brillance
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4">
                    L'Acier Inoxydable
                  </h2>
                  <p className="mb-4">
                    L'acier inoxydable est un alliage de fer, de chrome, de
                    nickel et de carbone. Il ne ternit pas et ne rouille pas.
                  </p>
                  <p className="mb-4">
                    Les bijoux fabriqués ici sont hypoallergéniques. Pour éviter
                    que sa couleur ne soit altérée, je vous conseille de retirer
                    vos bijoux lors du sport et d'éviter de mettre du parfum ou
                    d'autres produits cosmétiques.
                  </p>
                  <p className="mb-4">
                    Vous pouvez nettoyer délicatement votre bijou à l'eau, avec
                    un savon doux et une chamoisine.
                  </p>
                </article>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Colonne de droite avec l'image */}
        <div className="flex justify-center items-center">
          <Image
            src="/images/giftcard.jpeg"
            alt="Magnifique coffret tenu dans les mains d'une jeune femme en train de l'ouvrir."
            width={600}
            height={200}
            className="rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductInformation;
