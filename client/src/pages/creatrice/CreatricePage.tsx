import profil from "./images/profil.jpg"
const CreatricePage = () => {
  return (
    <div
      id="about"
      className=" 2xl:w-1/2 lg:w-3/4 mx-auto pb-5 px-2 text-justify"
    >
      <div id="about-container">
        <div className="animated-container m-2">
          <section className="story-section">
            <h2>MON HISTOIRE</h2>
            <p>
              Je m&apos;appelle Cindy, créatrice de l&apos;Atelier Noralya et
              émerveillée depuis aussi loin que je me souvienne par
              l&apos;univers du Mariage.
              <br /> Par une douce journée d&apos;hiver, l&apos;idée est apparue
              comme une évidence : imaginer et créer un bijou qui vous ressemble
              en y intégrant l&apos;ancienne Tradition du{" "}
              <i>
                Something Blue, Something New, Something Borrowed, Something Old
              </i>
              .<br /> Une coutume qui consiste à porter le jour de son union{" "}
              <i>
                Quelque chose de Bleu, Quelque chose de Nouveau, Quelque chose
                d&apos;Emprunté, Quelque chose de vieux
              </i>
              .<br /> Un bijou qui vous sublimera que ce soit pour un moment
              unique ou pour illuminer votre quotidien.
            </p>
          </section>

          <section className="inspiration-section">
            <h2>MES INSPIRATIONS</h2>
            <p>
              De nature rêveuse et enthousiaste, je puise mes idées pieds nus
              dans l&apos;herbe fraîche de mon jardin, en observant ce que la
              nature veut bien me montrer et en faisant confiance à mon
              intuition.
              <br /> Cela m&apos;offre la possibilité de me ressourcer et de
              retranscrire sur mes croquis toutes les émotions ressenties pour
              en faire un bijou, votre bijou.
              <br /> Un je-ne-sais-quoi de magique !<br /> Je fais en sorte
              qu&apos;à travers mes créations se dégage une sensation de
              douceur, d&apos;amour et de simplicité en y mettant tout mon
              savoir-faire mais aussi de belles intentions.
              <br /> Ces dernières ont plus de pouvoir qu&apos;elles n&apos;en
              paraissent …
            </p>
          </section>

          <section className="noralya-section">
            <img
              src={profil}
              alt="La créatrice assise portant sur ses genoux ses deux enfants."
              width={600}
              height={400}
              className="rounded"
            />
            <h2 className="mt-10">NORALYA</h2>
            <p>
              Certains me demandent parfois la signification du nom de mon
              Atelier.
              <br />
              Maman de deux jeunes enfants extraordinaires, respirant
              l&apos;innocence et l&apos;impétuosité, j&apos;ai souhaité
              qu&apos;ils fassent partie intégrante de ma petite entreprise.
              <br /> Pour ce faire, j&apos;ai ainsi mélangé les lettres de leurs
              doux prénoms : Ronan & Julia
            </p>
          </section>

          <section className="engagements-section">
            <h2>MES ENGAGEMENTS</h2>
            <p>
              Préserver au mieux la nature est l&apos;un de mes objectifs.
              <br /> Il est toujours possible de faire mieux certes, c&apos;est
              pourquoi je me remets régulièrement en question et fait mon
              maximum pour respecter la nature.
              <br /> J&apos;aime travailler avec les bijoux constitués de
              Goldfilled, un matériau consistant à appliquer une épaisse couche
              d&apos;or.
              <br /> Sa particularité ? Nous sommes sur de l&apos;or recyclé ce
              qui est une très belle alternative.
              <br /> Au final, le rendu est presque identique à celui de
              l&apos;or !
              <br /> Les écrins sont fabriqués en Europe, les boîtes
              d&apos;envois dans les Hauts-de-France, les deux conçus avec du
              carton certifié FSC® et de la colle à base d&apos;eau.
            </p>
          </section>

          <div className="bottom-section">
            <p>
              Je souhaite du fond du cœur qu&apos;en portant sur vous les
              créations de l&apos;Atelier Noralya, un sourire se liera sur votre
              merveilleux visage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatricePage;
