const ShippingAndReturns = () => {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <h1>Livraisons et Retours</h1>

      <section>
        <h2>Delais</h2>
        <p>
          Chaque création est confectionnée à la commande.
          <br />
          Le délai de fabrication varie en fonction de la période de l'année,
          des congés, et peut ainsi être de quelques jours à 4 semaines à
          compter de l'encaissement du paiement.
        </p>
        <p>
          N'hésitez pas à me contacter (
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          ) pour en savoir plus.
          <br />
          Les délais actuels sont indiqués en page d'accueil.
        </p>
        <p>
          Je peux traiter des commandes en urgence. Merci de me contacter avant
          de passer commande afin de savoir si cela est possible.
        </p>
      </section>

      <section>
        <h2>Livraisons</h2>
        <p>
          La livraison est réalisée à l’adresse indiquée par le client lors de
          la passation de la commande.
          <br />
          Atelier Noralya ne pourra être tenu responsable d’une erreur commise
          par le client.
        </p>
        <p>
          Les délais de livraison sont donnés à titre indicatif et varient en
          fonction de la zone géographique de livraison de la commande.
        </p>
        <p>
          Les produits sont envoyés en lettre ou Colissimo suivi, ou en
          Colissimo contre signature.
          <br />
          Atelier Noralya s’engage à livrer les produits achetés dans les délais
          prévus et indiqués lors de la commande.
        </p>
        <p>
          Si les produits n’ont pas été livrés dans un délai de 30 jours à
          compter de la date de livraison prévue (hors cas de force majeure
          selon l’article 1218 du Code civil), le client pourra résoudre la
          vente en envoyant une lettre recommandée avec accusé de réception à
          Atelier Noralya.
        </p>
        <p>
          Les sommes réglées seront remboursées.
          <br />
          Atelier Noralya ne pourra être tenu responsable des conséquences
          dommageables liées à un retard d’acheminement.
        </p>
        <p>
          En cas de problème à la livraison (emballage endommagé, produits
          manquants...), le client doit signaler ces anomalies sur le bordereau
          de livraison et confirmer par courrier recommandé au transporteur sous
          deux jours ouvrables. Une copie de ce courrier doit être envoyée à
          Atelier Noralya.
        </p>
        <p>
          Toute réclamation d'erreur de livraison ou de non-conformité doit être
          faite par email à :{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          , au plus tard le premier jour ouvré suivant la livraison.
        </p>
      </section>

      <section>
        <h2>Retour et Remboursement</h2>
        <p>
          Le client peut retourner les articles dans un délai de 14 jours
          calendaires à compter de leur réception, dans leur état d’origine,
          neuf, non porté, et en parfait état de vente.
        </p>
        <p>
          Pour des raisons d'hygiène, les boucles d'oreilles ne sont ni reprises
          ni échangées.
          <br />
          Les produits personnalisés ou réalisés sur-mesure ne pourront pas être
          remboursés.
        </p>
        <p>
          Les frais de retour sont à la charge du client.
          <br />
          En cas de perte ou détérioration du colis retourné, Atelier Noralya ne
          pourra pas procéder au remboursement.
        </p>
        <p>
          Tout retour doit être préalablement signalé par email à :{" "}
          <a
            href="mailto:contact@ateliernoralya.com"
            className="text-blue-500 underline"
          >
            contact@ateliernoralya.com
          </a>
          . Le client devra fournir une preuve de réexpédition (N° de suivi...).
        </p>
        <p>
          Atelier Noralya procédera au remboursement ou à l'échange sous 30
          jours. Les frais de livraison de la nouvelle commande sont offerts.
        </p>
        <p>
          Attention, aucun article ne sera remboursé ou échangé passé le délai
          de rétractation.
        </p>
      </section>

      <section>
        <h2>Service Apres-Vente</h2>
        <p>
          Atelier Noralya propose un service après-vente gratuit pour des
          modifications de commandes reçues (ex : collier trop long ou trop
          court).
        </p>
        <p>
          Le client doit expédier le bijou avec une note expliquant la
          modification souhaitée, ainsi qu'une enveloppe suivie affranchie pour
          le retour.
        </p>
        <p>
          Les frais de retour et de réexpédition sont à la charge du client. Les
          modifications sont effectuées dès réception.
        </p>
        <p>
          Le délai de confection indiqué sur le site ne s'applique pas aux
          modifications.
        </p>
      </section>
    </div>
  );
};

export default ShippingAndReturns;
