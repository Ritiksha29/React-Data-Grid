import React, { useState } from "react";
import "./Grid.css";

const Popup = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    make: "",
    model: "",
    price: "",
    electric: "",
    month: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedCell, setSelectedCell] = useState({ row: null, column: null });

  const rows = [
    {
      id: 1,
      make: "Tesla",
      model: "Model Y",
      price: "64950",
      electric: false,
      month: "December",
    },
    {
      id: 2,
      make: "Ford",
      model: "F-Series",
      price: "33850",
      electric: true,
      month: "March",
    },
    {
      id: 3,
      make: "Toyota",
      model: "Corolla",
      price: "29600",
      electric: false,
      month: "January",
    },
    {
      id: 4,
      make: "Mercedes",
      model: "EQA",
      price: "48890",
      electric: true,
      month: "May",
    },
    {
      id: 5,
      make: "Flat",
      model: "500",
      price: "15774",
      electric: true,
      month: "June",
    },
  ];

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleSearchChange = (e, field) => {
    setSearchFilters({ ...searchFilters, [field]: e.target.value });
  };

  // const handleSort = (key) => {
  //   const direction =
  //     sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
  //   setSortConfig({ key, direction });
  // };
  const handleSort = (key) => {
    let direction;
    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "asc"
          ? "desc"
          : sortConfig.direction === "desc"
            ? null
            : "asc";
    }
    else {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        return "\u2191"
      } // for ascending
      else if (sortConfig.direction === "desc") {
        return "\u2193"
      }// for descending
      else {
        return null;
      }

      // return sortConfig.direction === "asc" ? "\u2191" : "\u2193";
    }
    // no arrow default
  };

  const handleCellClick = (rowId, columnKey) => {
    const clickedCell = rows.find((row) => row.id === rowId)[columnKey];

    setSelectedCell({ row: rowId, column: columnKey });
  };

  const filteredRows = rows.filter((row) =>
    Object.entries(searchFilters).every(([key, value]) =>
      value
        ? String(row[key]).toLowerCase().includes(value.toLowerCase())
        : true
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <table className="grid-table">
        <thead>
          <tr>
            <th></th>
            <th onClick={() => handleSort("make")}>Make{getSortArrow("make")}</th>
            <th onClick={() => handleSort("model")}>Model{getSortArrow("model")}</th>
            <th onClick={() => handleSort("price")}>Price{getSortArrow("price")}</th>
            <th onClick={() => handleSort("electric")}>Electric{getSortArrow("electric")}</th>
            <th onClick={() => handleSort("month")}>Month{getSortArrow("month")}</th>
          </tr>

        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr
              key={row.id}
              className={isRowSelected(row.id) ? "highlight-row" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={isRowSelected(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                />
              </td>
              {Object.keys(row)
                .filter((key) => key !== "id")
                .map((key) => (
                  <td
                    key={key}
                    className={
                      selectedCell.row === row.id && selectedCell.column === key
                        ? "selected-cell"
                        : ""
                    }
                    onClick={() => handleCellClick(row.id, key)}
                  >
                    {key === "electric" ? (
                      <input type="checkbox" checked={row[key]} readOnly />
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Popup;
