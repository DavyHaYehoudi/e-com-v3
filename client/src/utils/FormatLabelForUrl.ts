export const formatLabelForURL = (label: string): string => {
  return label
    .toLowerCase() // Convertir en minuscules
    .normalize("NFD") // Normaliser les caractères avec accents
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/['’]/g, "") // Supprimer les apostrophes
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/[^a-z0-9\-]/g, "") // Supprimer tous les autres caractères spéciaux
    .replace(/-+/g, "-") // Remplacer les tirets multiples par un seul tiret
    .replace(/^-+|-+$/g, ""); // Supprimer les tirets en début ou fin de chaîne
};
