import { z } from "zod";

export const getStatisticSchema = z.coerce
  .number()
  .int()
  .min(2023, { message: "L'année doit être après 2024" })
  .max(new Date().getFullYear(), {
    message: "L'année ne peut pas être dans le futur",
  })
  .optional();

// Export du type TypeScript dérivé de Zod
export type StatisticTypeDTO = z.infer<typeof getStatisticSchema>;
