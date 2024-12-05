import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "dd MMM yyyy", { locale: fr });
};