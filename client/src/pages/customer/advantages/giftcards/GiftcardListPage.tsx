import GiftcardsTable from "./GiftcardsTable";

const GiftcardListPage = () => {
  return (
    <div className="container-responsive pb-10">
      <h1 className="text-center mb-10">Liste de vos cartes cadeaux</h1>
      <GiftcardsTable />
    </div>
  );
};

export default GiftcardListPage;
