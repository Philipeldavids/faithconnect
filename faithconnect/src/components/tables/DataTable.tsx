import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => React.ReactNode;
}
interface ActionColumn<T> {
  render: (row: T) => React.ReactNode;
 
  
}
interface Props<T> {
  data: T[];
  actions?: ActionColumn<T>[];
  columns: Column<T>[];
  pageSize?: number;
}

export default function DataTable<T>({
  data,
  columns,
  actions,
  pageSize
}: Props<T>) {
  return (
    <table className="w-full bg-white rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-slate-100">
          {columns.map((column) => (
            <th
              key={String(column.accessor)}
              className="text-left p-3"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.isArray(data)
  ? data.map((row, index) => (
          <tr
            key={index}
            className="border-b"
          >
            {columns.map((column) => (
              <td
                key={String(column.accessor)}
                className="p-3"
              >
                {String(
                  row[column.accessor]
                )}
              </td>
              
            ))}
            {
  actions?.map((action, idx) => (
    <td key={idx}>
      {action.render(row)}
    </td>
  ))
}
          </tr>
        )) : null}
      </tbody>
    </table>
  );
}