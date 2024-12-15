// import { format } from "date-fns";
// import { fr } from "date-fns/locale";

// export const formatDate = (dateString: string): string => {
//   return format(new Date(dateString), "dd MMM yyyy", { locale: fr });
// };

import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Cette fonction peut maintenant accepter une chaîne de caractères ou un objet Date
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "dd MMM yyyy", { locale: fr });
};
