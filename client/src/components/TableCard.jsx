import React, { useEffect, useState } from "react";
import getData from "../services/api";

const TableCard = ({ search }) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setValue(data);
      } catch (error) {
        console.error("Data fetching failed...", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fileteredData = value.filter((item) =>
    item.scrip.toLowerCase().includes(search.toLowerCase()),
  );

  const loadingDiv = (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-teal-500/20 border-t-teal-500 animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full blur-md border-4 border-transparent border-t-teal-400 animate-spin"></div>
      </div>
      <p className="text-teal-400 font-mono text-sm tracking-widest uppercase animate-pulse">
        Loading Market Data...
      </p>
    </div>
  );

  return loading ? (
    loadingDiv
  ) : (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <div className="rounded-xl border border-gray-700 ">
        <table className="min-w-full divide-y divide-gray-700 bg-slate-900 text-white">
          <thead className="bg-slate-800 uppercase sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Scrip
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">LTP</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Delta
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Percent Change
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                High
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Low</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Qty</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {fileteredData.map((scrip, index) => (
              <tr key={index} className="hover:bg-slate-800">
                <td className="px-6 py-4 font-medium">{scrip.scrip}</td>
                <td className="px-6 py-4">{scrip.ltp}</td>
                <td className="px-6 py-4">
                  {Number(scrip.high - scrip.low) > 0 ? "green" : "red"}
                </td>
                <td className="px-6 py-4 text-center">
                  {scrip.percent_change}
                </td>
                <td className="px-6 py-4">{scrip.high}</td>
                <td className="px-6 py-4">{scrip.low}</td>
                <td className="px-6 py-4">{scrip.qty}</td>
                <td>
                  <input
                    type="checkbox"
                    name="select"
                    className="h-4 w-4 rounded border-none bg-gray-200 accent-teal-600 focus:ring-0 focus:ring-offset-0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCard;
