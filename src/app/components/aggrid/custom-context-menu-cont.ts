import {
  ExportParams,
  GridApi,
  ProcessHeaderForExportParams,
  ProcessRowGroupForExportParams,
} from "ag-grid-community";

const exportParams: ExportParams<any> = {
  processRowGroupCallback: rowGroupCallback,
  processHeaderCallback: headerCallback,
};

function onCopyRow(gridApi: GridApi, includeHeaders: boolean = false): void {
  gridApi.copySelectedRowsToClipboard({ includeHeaders });
}

function onExportDataAsCsv(gridApi: GridApi): void {
  gridApi.exportDataAsCsv(exportParams);
}

function onExportDataAsExcel(gridApi: GridApi): void {
  gridApi.exportDataAsExcel(exportParams);
}

function headerCallback(params: ProcessHeaderForExportParams): string {
  return params.column.getColDef().headerName?.toUpperCase() || "";
}

function rowGroupCallback(params: ProcessRowGroupForExportParams): string {
  const node = params.node;
  return node.key?.toUpperCase() || "";
}

function isRowSelected(gridApi: GridApi): boolean {
  return gridApi.getSelectedRows().length !== 0;
}
