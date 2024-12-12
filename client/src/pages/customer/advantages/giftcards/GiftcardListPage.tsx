import GiftcardsTable from "./GiftcardsTable";

const GiftcardListPage = () => {
  return (
    <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
      <h1 className="text-center mb-10">Liste de vos cartes cadeaux</h1>
      <GiftcardsTable />
    </div>
  );
};

export default GiftcardListPage;
