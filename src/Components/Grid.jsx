import React, { useState } from "react";
import "./Grid.css";
import Popup from "./Popup";

const Grid = () => {
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
  const [popup, setPopup] = useState(false);

  const [rows, setRows] = useState([
    {
      id: 1,
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      id: 2,
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      id: 3,
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      id: 4,
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },
    {
      id: 5,
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },

    {
      id: 6,
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },

    {
      id: 7,
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      month: "June",
    },

    {
      id: 8,
      make: "Tesla",
      model: "Model-Y",
      price: 64950,
      electric: true,
      month: "June",
    },
  ]);

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleCellClick = (rowId, columnKey) => {
    const clickedCell = rows.find((row) => row.id === rowId)[columnKey];
    console.log(`Cell clicked: row ${rowId}, column ${columnKey}`);
    setSelectedCell({ row: rowId, column: columnKey });
  };

  //search
  const handleSearchChange = (e, field) => {
    setSearchFilters({ ...searchFilters, [field]: e.target.value });
  };

  const filteredRows = rows.filter((row) =>
    Object.entries(searchFilters).every(([key, value]) =>
      value
        ? String(row[key]).toLowerCase().includes(value.toLowerCase()) ||
        String(row[key]).toString().includes(value.toString())
        : true
    )
  );

  //sort
  const handleSort = (key) => {
    let direction;
    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "asc"
          ? "desc"
          : sortConfig.direction === "desc"
            ? null
            : "asc";
    } else {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (!sortConfig.key || sortConfig.direction === null) return "";
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "\u2191" : "\u2193";
    }

    return "";
  };

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  //conditional popup
  const handlePriceclick = (price) => {
    if (price >= 60000 && price <= 150000) {
      setPopup(true);
    }
  };

  //multiheader
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleexpand = () => {
    setIsExpanded(!isExpanded);
  };

  //cell editing
  const [isEditing, setIsediting] = useState(false);
  const handleCellEdit = (rowId, columnKey, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [columnKey]: value } : row
      )
    );
  };

  return (
    <>
      <div>
        <table className={`grid-table ${popup ? "blur" : ""}`}>
          <thead>
            <tr>
              <th colSpan={3}>Brand and Model</th>
              <th colSpan={isExpanded ? 3 : 1} onClick={toggleexpand}>
                Brand Details {isExpanded ? "<" : ">"}
              </th>
            </tr>
            <tr>
              <th></th>
              <th onClick={() => handleSort("make")}>
                Make {getSortArrow("make")}
              </th>
              <th onClick={() => handleSort("model")}>
                Model {getSortArrow("model")}
              </th>
              <th onClick={() => handleSort("price")}>
                Price {getSortArrow("price")}
              </th>

              {isExpanded && (
                <>
                  <th onClick={() => handleSort("electric")}>
                    Electric {getSortArrow("electric")}
                  </th>

                  <th onClick={() => handleSort("month")}>
                    Month {getSortArrow("month")}
                  </th>
                </>
              )}
            </tr>

            <tr>
              <th></th>
              <th>
                <input
                  type="text"
                  placeholder="Filter by Make"
                  value={searchFilters.make}
                  onChange={(e) => handleSearchChange(e, "make")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filter by Model"
                  value={searchFilters.model}
                  onChange={(e) => handleSearchChange(e, "model")}
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Filter by Price"
                  value={searchFilters.price}
                  onChange={(e) => handleSearchChange(e, "price")}
                />
              </th>

              {isExpanded && (
                <>
                  <th>
                    <input
                      type="text"
                      placeholder="Filter by Electric"
                      value={searchFilters.electric}
                      onChange={(e) => handleSearchChange(e, "electric")}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      placeholder="Filter by Month"
                      value={searchFilters.month}
                      onChange={(e) => handleSearchChange(e, "month")}
                    />
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr
                key={row.id}
                className={isRowSelected(row.id) ? "highlight-row" : ""}
              >
                {/* Checkbox for row selection */}
                <td>
                  <input
                    type="checkbox"
                    checked={isRowSelected(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>

                {/* Make column with cell selection */}
                <td
                  className={
                    selectedCell.row === row.id &&
                      selectedCell.column === "make"
                      ? "selected-cell"
                      : ""
                  }
                  onClick={() => handleCellClick(row.id, "make")}
                  onDoubleClick={() => setIsediting(true)}
                >
                  {selectedCell.row === row.id &&
                    selectedCell.column === "make" && isEditing ? (
                    <input
                      type="text"
                      value={row.make}
                      onChange={(e) =>
                        handleCellEdit(row.id, "make", e.target.value)
                      }
                      onBlur={() =>
                        setIsediting(false)
                      }
                    />
                  ) : (
                    row.make
                  )}
                </td>

                {/* Model column with cell selection */}
                <td
                  className={
                    selectedCell.row === row.id &&
                      selectedCell.column === "model"
                      ? "selected-cell"
                      : ""
                  }
                  onClick={() => handleCellClick(row.id, "model")}
                  onDoubleClick={() => setIsediting(true)}
                >
                  {selectedCell.row === row.id &&
                    selectedCell.column === "model" && isEditing ? (
                    <input
                      type="text"
                      value={row.model}
                      onChange={(e) =>
                        handleCellEdit(row.id, "model", e.target.value)
                      }
                      onBlur={() =>
                        setIsediting(false)
                      }
                    />
                  ) : (
                    row.model
                  )}
                </td>

                {/* Price column with cell selection */}
                <td
                  className={
                    selectedCell.row === row.id &&
                      selectedCell.column === "price"
                      ? "selected-cell"
                      : ""
                  }
                  onClick={() => {
                    handleCellClick(row.id, "price");
                    handlePriceclick(row.price);
                  }}
                  onDoubleClick={() => setIsediting(true)}
                >
                  {selectedCell.row === row.id &&
                    selectedCell.column === "price" && isEditing ? (
                    <input
                      type="text"
                      value={row.price}
                      onChange={(e) =>
                        handleCellEdit(row.id, "price", e.target.value)
                      }
                      onBlur={() =>
                        setIsediting(false)
                      }
                    />
                  ) : (
                    row.price
                  )}
                </td>

                {isExpanded && (
                  <>
                    <td
                      className={
                        selectedCell.row === row.id &&
                          selectedCell.column === "electric"
                          ? "selected-cell"
                          : ""
                      }
                      onClick={() => handleCellClick(row.id, "electric")}
                      onDoubleClick={() => setIsediting(true)}

                    >
                      {selectedCell.row === row.id &&
                        selectedCell.column === "electric" && isEditing ? (
                        <input
                          type="checkbox"
                          value={row.electric}
                          onChange={(e) =>
                            handleCellEdit(row.id, "electric", e.target.value)
                          }
                          onBlur={() =>
                            setIsediting(false)
                          }
                        />
                      ) : (
                        <input type="checkbox" checked={row.electric} />
                      )}
                    </td>

                    {/* Month column with cell selection */}
                    <td
                      className={
                        selectedCell.row === row.id &&
                          selectedCell.column === "month"
                          ? "selected-cell"
                          : ""
                      }

                      onClick={() => handleCellClick(row.id, "month")}
                      onDoubleClick={() => setIsediting(true)}
                    >
                      {selectedCell.row === row.id &&
                        selectedCell.column === "month" && isEditing ? (
                        <input
                          type="text"
                          value={row.month}
                          onChange={(e) =>
                            handleCellEdit(row.id, "month", e.target.value)
                          }
                          onBlur={() =>

                            setIsediting(false)
                          }
                        />
                      ) : (
                        row.month
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popup && (
        <>
          <div className="popup">
            <button style={{ float: "right" }} onClick={() => setPopup(false)}>
              X
            </button>
            <Popup />
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setPopup(false)} className="close-btn">
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Grid;