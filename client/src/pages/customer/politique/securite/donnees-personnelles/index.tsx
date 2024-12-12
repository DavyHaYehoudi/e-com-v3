const SecurityPolicy = () => {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Politique de protection des donnees personnelles
      </h1>
      <section>
        <p>
          Nous accordons une grande importance à la confidentialité et à la
          sécurité de vos données personnelles. Les données que vous partagez
          avec nous sont stockées dans une base de données sécurisée, hébergée
          dans des centres de données conformes aux normes de sécurité en
          vigueur.
        </p>
        <ul className="list-disc ml-6 mt-4">
          <li>
            Vos informations personnelles (nom, adresse, e-mail, etc.) sont
            utilisées uniquement pour le traitement de vos commandes, la gestion
            de votre compte et l'amélioration de nos services.
          </li>
          <li>
            Nous ne partageons jamais vos données avec des tiers sans votre
            consentement explicite, sauf dans les cas où la loi l'exige.
          </li>
          <li>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données. Pour exercer ces droits, vous pouvez
            nous contacter à l'adresse e-mail suivante :{" "}
            <a
              href="mailto:contact@ateliernoralya.com"
              className="text-blue-500 underline"
            >
              contact@ateliernoralya.com
            </a>
          </li>
        </ul>
        <p className="mt-4">
          Nous mettons régulièrement à jour nos systèmes et nos procédures pour
          garantir un haut niveau de sécurité et protéger vos données contre
          tout accès non autorisé.
        </p>
      </section>
    </div>
  );
};

export default SecurityPolicy;
