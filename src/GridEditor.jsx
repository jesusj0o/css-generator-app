import { useState } from "react";

const GridEditor = ({ rows, columns, onSelectionChange, selectedAreas = [] }) => {
  const [startCell, setStartCell] = useState(null);
  const [hoverArea, setHoverArea] = useState(null);

  const total = rows * columns;

  const getCellPosition = (index) => {
    const row = Math.floor(index / columns) + 1;
    const col = (index % columns) + 1;
    return { row, col };
  };

  const isCellInHover = (index) => {
    if (!hoverArea) return false;
    const { row, col } = getCellPosition(index);
    return (
      row >= hoverArea.startRow &&
      row <= hoverArea.endRow &&
      col >= hoverArea.startCol &&
      col <= hoverArea.endCol
    );
  };

  const isCellInFinalSelection = (index) => {
    const { row, col } = getCellPosition(index);
    return selectedAreas.some(area =>
      row >= area.startRow &&
      row <= area.endRow &&
      col >= area.startCol &&
      col <= area.endCol
    );
  };

  const handleMouseDown = (index) => {
    setStartCell(index);
    const { row, col } = getCellPosition(index);
    setHoverArea({ startRow: row, endRow: row, startCol: col, endCol: col });
  };

  const handleMouseEnter = (index) => {
    if (startCell === null) return;
    const start = getCellPosition(startCell);
    const end = getCellPosition(index);

    const newArea = {
      startRow: Math.min(start.row, end.row),
      endRow: Math.max(start.row, end.row),
      startCol: Math.min(start.col, end.col),
      endCol: Math.max(start.col, end.col),
    };

    setHoverArea(newArea);
  };

  const handleMouseUp = () => {
    if (hoverArea) {
      onSelectionChange(hoverArea);
    }
    setStartCell(null);
    setHoverArea(null);
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-400 bg-white p-2"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "8px",
        }}
      >
        {Array.from({ length: total }, (_, index) => {
          const inFinal = isCellInFinalSelection(index);
          const inHover = isCellInHover(index);

          let cellClass = "bg-gray-300 text-black";
          if (inFinal) cellClass = "bg-blue-600 text-white";
          else if (inHover) cellClass = "bg-blue-300 text-white";

          return (
            <div
              key={index}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseUp={handleMouseUp}
              className={`flex items-center justify-center h-16 rounded font-bold cursor-pointer select-none ${cellClass}`}
            >
              {inFinal || inHover ? "✓" : "+"}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 mt-2 italic">
        Selecciona múltiples áreas para generar ítems. Las seleccionadas se mantienen marcadas.
      </div>
    </>
  );
};

export default GridEditor;
