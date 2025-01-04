const SecurityPolicy = () => {
  return (
    <div className="pb-8 px-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Politique de securite des paiements
      </h1>

      <section className="mb-8">
        <p>
          Toutes les transactions effectuées sur notre site sont sécurisées
          grâce à notre partenariat avec{" "}
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Stripe
          </a>
          , l'un des leaders mondiaux dans le traitement des paiements en ligne.
        </p>
        <ul className="list-disc ml-6 mt-4">
          <li>
            Les paiements sont chiffrés à l'aide de la technologie SSL (Secure
            Socket Layer), garantissant que vos données sont protégées pendant
            leur transmission.
          </li>
          <li>
            Nous n'avons jamais accès à vos données bancaires, car celles-ci
            sont directement traitées par Stripe.
          </li>
          <li>
            Stripe est conforme aux normes PCI DSS (Payment Card Industry Data
            Security Standard), un standard de sécurité rigoureux pour la
            gestion des paiements.
          </li>
        </ul>
        <p className="mt-4">
          Vous pouvez ainsi effectuer vos achats en toute confiance, en
          utilisant les principales cartes bancaires, telles que Visa,
          MasterCard et American Express.
        </p>
      </section>
    </div>
  );
};

export default SecurityPolicy;
