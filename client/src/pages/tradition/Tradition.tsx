import tradition1 from "./images/tradition-1.jpeg";
import tradition2 from "./images/tradition-2.jpeg";
import tradition3 from "./images/tradition-3.jpeg";
import tradition4 from "./images/tradition-4.jpeg";
import tradition5 from "./images/tradition-5.jpeg";

const TraditionPage = () => {
  return (
    <main>
      <div id="tradition">
        <div className="animated-container">
          <section className="hero block  text-dark">
            <div className="hero-content block-content right">
              <div className="text">
                <p className="first">
                  <b>
                    « Something old, Something new, Something borrowed,
                    Something blue and a silver sixpence in her shoe. »
                  </b>{" "}
                </p>
                <br />
                <p>
                  Laissez-vous séduire par cette ancienne Tradition et mêlez une
                  partie de vous ou de quelqu&apos;un de cher à vos yeux dans
                  Votre bijou.
                </p>
                <br />
                <p>
                  <b>
                    Envie d&apos;en savoir plus ? Lisez-moi jusqu&apos;au bout
                    ...
                  </b>{" "}
                </p>
              </div>
              <div className="illustration right">
                <img
                  src={tradition1}
                  alt="Tradition sommaire illustration"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </section>
          <section className="title text-dark">
            <div className="title-content">
              <h1>La Tradition</h1>
              <p className="first">
                « Something old, Something new, Something borrowed, Something
                blue and a silver sixpence in her shoe. »
              </p>
              <br />
              <p>
                Si comme moi il vous arrive de regarder des films à l&apos;eau
                de rose, il se peut que vous ayez déjà entendu parler de cette
                coutume à suivre le jour de son mariage.{" "}
              </p>
              <br />
              <p>
                Tout a commencé au XIXème siècle en Angleterre après le récit
                d&apos;un poème &quot;Quatre Quelque Chose&quot; énumérant
                chaque chose que devait porter la mariée le jour J. Dans quel
                intérêt? Vivre un amour sincère bien sûr.
              </p>
            </div>
          </section>
          <section className="somethingOld block text-dark">
            <div className="somethingOld-content block-content left">
              <div className="illustration left">
                <img
                  src={tradition2}
                  alt="Tradition"
                  width={600}
                  height={400}
                />
              </div>
              <div className="text">
                <h2>Something Old</h2>
                <p>
                  &quot;Quelque chose de vieux&quot; est le symbole du lien
                  familial, du passage de la jeune fille à la Femme. Un bijou ou
                  une partie d&apos;un bijou ayant appartenu à votre mère, ou
                  grand-mère ou arrière grand-mère sera idéal pour cette
                  symbolique là. Et si rien ne vous vient, sachez que le
                  Gold-Filled (matériau principal que j&apos;utilise) est de
                  l&apos;or recyclé donc parfaitement aligné avec la tradition.
                </p>
              </div>
            </div>
          </section>
          <section className="somethingNew block text-dark">
            <div className="somethingNew-content block-content right">
              <div className="text">
                <h2>Something New</h2>
                <p>
                  &quot;Quelque chose de neuf&quot; pour symboliser un nouveau
                  chapitre dans sa vie de Femme. Votre robe de mariée, vos
                  chaussures ou bien un bijou Noralya, c&apos;est en général la
                  coutume la plus facile à respecter.
                </p>
              </div>
              <div className="illustration right">
                <img
                  src={tradition3}
                  alt="Tradition sommaire illustration"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </section>
          <section className="somethingBorrowed block text-dark">
            <div className="somethingBorrowed block-content left">
              <div className="illustration left">
                <img
                  src={tradition4}
                  alt="Tradition sommaire illustration"
                  width={600}
                  height={400}
                />
              </div>
              <div className="text">
                <h2>Something Borrowed</h2>
                <p>
                  &quot;Quelque chose d&apos;emprunté&quot;, un ou une amie qui
                  compte beaucoup dans votre vie pourrait vous prêter ce petit
                  Quelque chose pour le Jour J: une épingle à cheveux ou une
                  épingle à nourrice pour votre robe. La tradition dit que si
                  cet(te) ami(e) est comblé(e) dans son mariage alors c&apos;est
                  encore mieux.
                </p>
              </div>
            </div>
          </section>
          <section className="somethingBlue block text-dark">
            <div className="somethingBlue-content block-content right">
              <div className="text">
                <h2>Something Blue</h2>
                <p>
                  La partie la plus essentielle à mes yeux, ce &quot;quelque
                  chose de bleu&quot; qui fermera la boucle de cette coutume
                  ancestrale. Le bleu symbolise la pureté de votre amour envers
                  votre moitié. Des semelles bleues à un ruban de satin cousu à
                  la robe, ou mieux encore le Collier &quot;SOMETHING BLUE&quot;
                  de l&apos;Atelier Noralya. Vous trouverez j&apos;en suis sûre
                  ce petit Quelque Chose qui vous fait voir la vie en Bleu.
                </p>
              </div>
              <div className="illustration right">
                <img
                  src={tradition5}
                  alt="Tradition sommaire illustration"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </section>
          <hr />
          <section className="particularity">
            <div className="particularity-content">
              <h3>La particularité de l&apos;Atelier Noralya ?</h3>
              <ol>
                <li>
                  J&apos;intègre un ou plusieurs éléments de cette tradition à
                  votre bijou pour qu&apos;il soit unique, qu&apos;il vous
                  ressemble et qu&apos;il vous accompagne dans des étapes
                  importantes de votre vie.
                </li>
                <li>
                  Dans un premier temps, nous échangeons ensemble sur vos
                  souhaits : Gold-Filled, Argent Massif, perles de Tahiti,
                  perles d&apos;eau douce, pierres naturelles, ...{" "}
                </li>
                <li>
                  Par la suite, vous m&apos;indiquez quels sont les éléments que
                  vous avez déjà en votre possession et que vous souhaitez
                  déposer sur le bijou: pendentif, chaine, perle, mèche de
                  cheveux, ...
                </li>
                <li>Je vous envoie un devis à me renvoyer signé par mail.</li>
                <li>
                  J&apos;attends la réception par courrier en lettre suivie de
                  vos éléments. Nous échangeons par mail ou en visio pour voir
                  l&apos;avancée du bijou et je vous renvoie celui-ci une fois
                  la proposition validée par vos soins.
                </li>
              </ol>
              <p className="magic">
                <b>
                  Et maintenant, puisse la Magie nous accompagner dans cette
                  création unique.
                </b>{" "}
              </p>
            </div>
            <p className="btn" id="contact">
              {" "}
              <a
                href="/contact"
                className="bg-[var(--dark-mode-black)] py-2 px-4 rounded-md shadow-md text-[var(--whiteSmoke)] tracking-wider dark:bg-[var(--whiteSmoke)] dark:text-[var(--dark-mode-black)]"
              >
                {" "}
                Contactez-moi
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TraditionPage;
