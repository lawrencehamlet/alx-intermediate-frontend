import { RowID, RowElement } from './interface';

declare module 'crud' {
  export function insertRow(row: RowElement): RowID;
  export function deleteRow(rowId: RowID): void;
  export function updateRow(rowId: RowID, row: RowElement): RowID;
}

declare const CRUD: {
  insertRow(row: RowElement): RowID;
  deleteRow(rowId: RowID): void;
  updateRow(rowId: RowID, row: RowElement): RowID;
};

export as namespace CRUD;
export default CRUD;
