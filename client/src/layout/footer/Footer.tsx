const letterSpacing1 = "0.2em";
const letterSpacing2 = "0.3em";
const Footer = () => {
  return (
    <footer
      className="p-4 lg:p-10"
      style={{
        color: "var(--whiteSmoke)",
      }}
    >
      <div className="flex flex-wrap  gap-20 md:gap-5 md:justify-around">
        {/* Colonne 1 : Menu principal */}
        <div>
          <h2
            className="text-lg"
            style={{
              letterSpacing: letterSpacing2,
              color: "var(--text-golden)",
            }}
          >
            MENU PRINCIPAL
          </h2>
          <ul className="mt-4">
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/creatrice">Créatrice</a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/tradition">Tradition</a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/contact">Contact</a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/carte-cadeau">Carte cadeau</a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/produits">Produits</a>
            </li>
          </ul>
        </div>
        {/* Colonne 2 : Réseaux sociaux */}
        <div>
          <h2
            className="text-lg "
            style={{
              letterSpacing: letterSpacing2,
              color: "var(--text-golden)",
            }}
          >
            RESEAUX SOCIAUX
          </h2>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://www.facebook.com/people/Cindy-Pantoustier-Naturopathe/100085082745386/?ref=pages_you_manage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="h-10 w-10"
                width="40"
                height="40"
              />
            </a>
            <a
              href="https://www.instagram.com/cindy_naturo/?hl=fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/instagram.png"
                alt="Instagram"
                className="h-10 w-10"
                width="40"
                height="40"
              />
            </a>
          </div>
        </div>

        {/* Colonne 3 : Informations générales */}
        <div>
          <h2
            className="text-lg "
            style={{
              letterSpacing: letterSpacing2,
              color: "var(--text-golden)",
            }}
          >
            INFORMATIONS
          </h2>
          <ul className="mt-4">
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/livraison-et-retour">Livraisons et retours</a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/mentions-legales">Mentions légales</a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a href="/conditions-generales-de-vente">
                Conditions générales de vente
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 ">
        <p>&copy; 2025 Atelier Noralya. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
