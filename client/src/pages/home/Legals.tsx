
const Legals = () => {
  return (
    <section>
      <div className="container mx-auto flex justify-center lg:justify-between items-center gap-6 flex-wrap py-4">
        <a
          href="/deliveries-returns"
          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow transition duration-300"
        >
          <p className="text-gray-700 font-semibold">Retours sous 14 jours</p>
        </a>

        <a
          href="/terms-of-sales"
          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow transition duration-300"
        >
          <p className="text-gray-700 font-semibold">Paiements sécurisés</p>
        </a>

        <a
          href="/deliveries-returns"
          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow transition duration-300"
        >
          <p className="text-gray-700 font-semibold">
            Service clientèle 5 jours sur 7
          </p>
        </a>
      </div>
    </section>
  );
};

export default Legals;
