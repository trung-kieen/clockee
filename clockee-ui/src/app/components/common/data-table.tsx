import React, { ReactNode } from "react";
/**
 * Display list of resource
 */
type DataTableProps<T> = {
  data: T[];
  emptyMessage?: string;
  headers: string[];
  renderRow: (item: T, index: number) => ReactNode;
};
const DataTable = <T,>({
  data,
  emptyMessage = "Không có dữ liệu",
  headers = [],
  renderRow,
}: DataTableProps<T>) => {
  if (!data || data.length === 0) {
    return <>{emptyMessage}</>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
      </table>
    </div>
  );
};

export default DataTable;
