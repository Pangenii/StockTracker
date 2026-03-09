import React from "react";

const TableCard = () => {
  const users = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Courtney Henry",
      title: "Designer",
      email: "courtney.henry@example.com",
      role: "Admin",
    },
    {
      name: "Tom Cook",
      title: "Director of Product",
      email: "tom.cook@example.com",
      role: "Member",
    },
    {
      name: "Whitney Francis",
      title: "Copywriter",
      email: "whitney.francis@example.com",
      role: "Admin",
    },
    {
      name: "Leonard Krasner",
      title: "Senior Designer",
      email: "leonard.krasner@example.com",
      role: "Owner",
    },
    {
      name: "Floyd Miles",
      title: "Principal Designer",
      email: "floyd.miles@example.com",
      role: "Member",
    },
  ];

  return (
    <div className="p-8">
      <div className="overflow-hidden rounded-xl border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700 bg-slate-900 text-white">
          <thead className="bg-slate-800 uppercase">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Scrip
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">LTP</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Delta
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
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
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-slate-800">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.title}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-400 hover:text-indigo-300">
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCard;
