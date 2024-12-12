const TermsOfSales: React.FC = () => {
  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Conditions Generales de Vente</h1>

      <section className="mb-6">
        <p>
          Les présentes conditions de vente sont conclues d’une part par{" "}
          <strong>Atelier Noralya</strong> dont le siège social est situé au
          555, Avenue de la République, 83560 VINON-SUR-VERDON, inscrit sous le
          numéro SIRET 91861010600018, code APE 9609Z, et d’autre part, par
          toute personne physique ou morale dénommée ci-après "le CLIENT"
          souhaitant procéder à un achat via le site Internet de{" "}
          <a
            href="https://www.atelier-noralya.com"
            className="text-blue-500 underline"
          >
            www.atelier-noralya.com
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Objet</h2>
        <p>
          Les présentes conditions de vente visent à définir les relations
          contractuelles entre Atelier Noralya et le CLIENT ainsi que les
          conditions applicables à tout achat effectué par le biais du site{" "}
          <a
            href="https://www.atelier-noralya.com"
            className="text-blue-500 underline"
          >
            www.atelier-noralya.com
          </a>
          . L’acquisition d’un bien ou d’un service à travers ce site implique
          une acceptation sans réserve par le CLIENT des présentes conditions de
          vente. Ces conditions de vente prévaudront sur toutes autres
          conditions générales ou particulières non expressément agréées par
          Atelier Noralya.
        </p>
        <p>
          Atelier Noralya se réserve le droit de modifier ses conditions de
          vente à tout moment. Dans ce cas, les conditions applicables seront
          celles en vigueur à la date de la commande par le CLIENT.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mes creations</h2>
        <p>
          Les créations sont réalisées artisanalement avec soin dans notre
          atelier du sud de la France. Les pierres utilisées étant naturelles,
          elles peuvent varier légèrement en taille et en couleur. Les photos
          sont non contractuelles. Atelier Noralya s’efforce de réaliser les
          modèles au plus proche de l’article présenté sur le site{" "}
          <a
            href="https://www.atelier-noralya.com"
            className="text-blue-500 underline"
          >
            www.atelier-noralya.com
          </a>
          , sauf en cas de personnalisation.
        </p>
        <p>
          Nos apprêts sont sans nickel, conformément à la loi. Les modèles sont
          conçus avec des matériaux tels que le gold-filled, l’argent 925 et
          l’acier inoxydable. Ces informations sont précisées dans chaque fiche
          produit.
        </p>
      </section>

      {/* Autres sections similaires */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Reclamations et Litiges</h2>
        <p>
          Toute réclamation du CLIENT devra être faite par écrit et transmise à
          l’adresse email suivante :{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          , ou à l’adresse postale suivante : Mme Pantoustier Cindy, 93, chemin
          du colombier 83 560 Vinon-sur-Verdon.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Propriete Intellectuelle</h2>
        <p>
          Tous les éléments du site{" "}
          <a
            href="https://www.atelier-noralya.com"
            className="text-blue-500 underline"
          >
            www.atelier-noralya.com
          </a>{" "}
          sont la propriété exclusive de Atelier Noralya. Toute reproduction,
          exploitation ou rediffusion est strictement interdite sans
          autorisation préalable.
        </p>
      </section>
    </section>
  );
};

export default TermsOfSales;
