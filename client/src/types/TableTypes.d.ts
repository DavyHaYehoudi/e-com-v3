// @tanstack/table-core.d.ts
import { ColumnMeta as OriginalColumnMeta, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  export interface ColumnMeta<TData extends RowData, TValue = unknown> {
    headerName?: string;
    // Tu peux ajouter d'autres propriétés ici si nécessaire
  }
}
