import { z } from "zod";

// Schéma pour modifier une commande (PATCH)
export const updateOrderSchema = z.object({
  statusOrder: z.number().optional(),
  statusPayment: z.number().optional()
});

export type UpdateOrderDTO = z.infer<typeof updateOrderSchema>;
