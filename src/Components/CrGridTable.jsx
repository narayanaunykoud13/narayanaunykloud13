// CrGridReact.js
import React, { forwardRef, useEffect, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

ModuleRegistry.registerModules([ClientSideRowModelModule, ExcelExportModule, RowGroupingModule]);

const CrGridTable = forwardRef((props, ref) => {
  const {
    rowData,
    columnDefs,
    defaultColDef,
    onGridReady,
    rowDragManaged,
    reactiveCustomComponents,
    rowMultiSelectWithClick,
    multiSortKey,
    style,
    excelStyles,
  } = props;

  const [visibleHeight, setVisibleHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 100; // document.getElementById('header').offsetHeight;
      const newHeight = window.innerHeight - headerHeight;
      setVisibleHeight(newHeight);
    };

    // Set the initial height
    updateHeight();

    // Update the height on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="ag-theme-alpine" style={style}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        ref={ref}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowDragManaged={rowDragManaged}
        reactiveCustomComponents={reactiveCustomComponents}
        rowMultiSelectWithClick={rowMultiSelectWithClick}
        multiSortKey={multiSortKey}
        excelStyles={excelStyles}
      />
    </div>
  );
});

export default CrGridTable;
