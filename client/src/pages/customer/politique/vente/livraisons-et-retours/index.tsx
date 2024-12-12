const ShippingAndReturnsDashboard = () => {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Livraisons et Retours</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Delais de Fabrication</h2>
        <p>
          Toutes les créations sont fabriquées sur commande. Les délais varient
          entre quelques jours et 4 semaines selon la période. Consultez les
          délais actuels sur la page d'accueil ou contactez-nous pour des
          demandes urgentes :{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Livraison</h2>
        <p>
          Les commandes sont envoyées via Colissimo suivi ou contre signature.
          Les délais varient selon la destination. Veillez à fournir une adresse
          correcte, Atelier Noralya ne peut être tenu responsable des erreurs ou
          des incidents liés à La Poste.
        </p>
        <p>
          Si un colis arrive endommagé ou ouvert, refusez-le et signalez-le
          immédiatement. Toute anomalie doit être déclarée dans les 2 jours
          ouvrables auprès du transporteur et Atelier Noralya :{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Retours et Remboursements</h2>
        <p>
          Vous pouvez retourner vos articles dans un délai de 14 jours
          calendaires après réception, dans leur état neuf et complet. Les frais
          de retour sont à votre charge. Les articles personnalisés ou d'hygiène
          (comme les boucles d'oreilles) ne sont ni repris, ni échangés.
        </p>
        <p>
          Pour signaler un retour, contactez-nous à{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          . Un remboursement ou un échange sera traité sous 30 jours.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Service Apres-Vente</h2>
        <p>
          Modifications gratuites pour les clientes après réception (exemple :
          ajustement de la longueur d'un collier). Expédiez l'article avec une
          description des modifications et une enveloppe affranchie pour le
          retour.
        </p>
        <p>Les frais de retour et de réexpédition sont à votre charge.</p>
      </section>
    </div>
  );
};

export default ShippingAndReturnsDashboard;
