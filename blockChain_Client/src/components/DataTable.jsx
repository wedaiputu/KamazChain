const DataTable = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0 || !data[0]) {
    return <p className="text-gray-500">Tidak ada data.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-xs table-fixed">
        <thead className="bg-gray-100 text-left">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border px-2 py-1 font-semibold capitalize truncate"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              {headers.map((header) => (
                <td key={header} className="border px-2 py-1 truncate">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
