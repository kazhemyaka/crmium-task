import { type FC } from "react";

interface TableProps {
  headers: string[];
  rows: string[][];
}

const Table: FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="w-full mt-4">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-center">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
