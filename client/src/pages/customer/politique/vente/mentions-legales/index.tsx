const LegalMentions = () => {
  return (
    <div className="pb-8 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mentions Legales</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Atelier Noralya</h2>
        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
          pour la confiance en l'économie numérique, il est précisé aux
          utilisateurs du site Atelier Noralya l'identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi.
        </p>
        <p>
          Atelier Noralya est une marque artisanale française de bijoux et
          d'accessoires.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Me Contacter</h2>
        <p>
          Mme Pantoustier Cindy
          <br />
          Atelier : 93, chemin du colombier 83560 VINON-SUR-VERDON
          <br />
          Adresse e-mail :{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Edition du Site</h2>
        <p>
          Le présent site, accessible à l’URL{" "}
          <a
            href="https://www.atelier-noralya.com"
            className="text-blue-500 underline"
          >
            www.atelier-noralya.com
          </a>
          , est édité par :
        </p>
        <p>
          Pantoustier Cindy, résidant au 93, chemin du colombier 83560
          VINON-SUR-VERDON, de nationalité Française (France), née le
          28/01/1988, inscrite au R.C.S. de LIMOGES sous le numéro Limoges A 514
          471 547.
        </p>
        <p>
          Entreprise individuelle sous le régime fiscal et social de la
          micro-entreprise.
        </p>
        <p>
          Selon l'article n°293B du CGI, la TVA n'est pas applicable sur nos
          produits.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hebergement</h2>
        <p>
          Le site est hébergé par la société OVH SAS, située 2 rue Kellermann -
          BP 80157 - 59053 Roubaix Cedex 1.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Directeur de la Publication
        </h2>
        <p>
          Le Directeur de la publication du site est Davy SEBBAH.
          <br />
          Atelier Noralya est une marque déposée à l'INPI depuis 2023.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Donnees Personnelles</h2>
        <p>
          Le traitement de vos données à caractère personnel est régi par notre
          Charte du respect de la vie privée, disponible depuis la section
          "Charte de Protection des Données Personnelles", conformément au
          Règlement Général sur la Protection des Données 2016/679 du 27 avril
          2016 (« RGPD »).
        </p>
        <p>Numéro de déclaration au CNIL : 1481988 v 0</p>
      </section>
    </div>
  );
};

export default LegalMentions;
