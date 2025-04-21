const DataTable = ({ data }) => {
    // Cek dulu, kalau data belum ada atau kosong
    if (!Array.isArray(data) || data.length === 0 || !data[0]) {
      return <p className="text-gray-500">Tidak ada data.</p>;
    }
  
    const headers = Object.keys(data[0]);
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              {headers.map((header) => (
                <th key={header} className="border px-4 py-2 capitalize">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                {headers.map((header) => (
                  <td key={header} className="border px-4 py-2">{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default DataTable;
  