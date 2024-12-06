const LegalMentions = () => {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <h1>Mentions legales</h1>

      <section>
        <h2>Atelier Noralya</h2>
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

      <section>
        <h2>Me contacter</h2>
        <p>
          Mme Pantoustier Cindy
          <br />
          Atelier: 555, avenue de la république 83560 VINON-SUR-VERDON
          <br />
          Adresse e-mail:{" "}
          <a href="mailto:bonjour@ateliernoralya.com">
            bonjour@ateliernoralya.com
          </a>
        </p>
      </section>

      <section>
        <h2>Edition du site</h2>
        <p>
          Le présent site, accessible à l’URL{" "}
          <a href="https://www.atelier-noralya.com">www.atelier-noralya.com</a>,
          est édité par :
        </p>
        <p>
          Pantoustier Cindy, résidant au 555, avenue de la république 83560
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

      <section>
        <h2>Hebergement</h2>
        <p>
          Le site est hébergé par la société OVH SAS, située 2 rue Kellermann -
          BP 80157 - 59053 Roubaix Cedex 1.
        </p>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>
          Le Directeur de la publication du site est Davy SEBBAH.
          <br />
          Atelier Noralya est une marque déposée à l'INPI depuis 2023.
        </p>
      </section>

      <section>
        <h2>Donnees personnelles</h2>
        <p>
          Le traitement de vos données à caractère personnel est régi par notre
          Charte du respect de la vie privée, disponible depuis la section
          "Charte de Protection des Données Personnelles", conformément au
          Règlement Général sur la Protection des Données 2016/679 du 27 avril
          2016 (« RGPD »).
        </p>
        <p>Numéro de déclaration au CNIL: 1481988 v 0</p>
      </section>
    </div>
  );
};

export default LegalMentions;
