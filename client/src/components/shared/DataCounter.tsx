import React from "react";

// Type générique pour le composant
interface DataCounterProps<T> {
  items: T[]; // Tableau d'éléments de type T
  itemName: string; // Le nom de l'élément, par exemple "produit", "catégorie", etc.
}

const DataCounter = <T,>({ items, itemName }: DataCounterProps<T>) => {
  return (
    <>
      {items && items.length > 0 ? (
        <p>
          {items.length} {itemName}
          {items.length > 1 && "s"} trouvé{items.length > 1 && "s"}.
        </p>
      ) : (
        <p>Aucun {itemName} trouvé.</p>
      )}
    </>
  );
};

export default DataCounter;
