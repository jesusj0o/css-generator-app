import { useState, useEffect } from "react";
import GridEditor from "./GridEditor";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState([]);
  const [cssCode, setCssCode] = useState("");
  const [htmlCode, setHtmlCode] = useState("");

  const handleNewItem = (area) => {
    const newItem = {
      id: uuidv4(),
      ...area,
    };
    setItems([...items, newItem]);
  };

  const handleReset = () => {
    setItems([]);
  };

  useEffect(() => {
    const baseCss = `
.grid-preview {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
  background: #eee;
  border: 1px solid #ccc;
  position: relative;
  height: 300px;
  max-width: 600px;
  width: 100%;
}
`;

    const itemCss = items
      .map((item, i) => {
        return `
.item-${i + 1} {
  grid-column: ${item.startCol} / ${item.endCol + 1};
  grid-row: ${item.startRow} / ${item.endRow + 1};
  background: rgba(59, 130, 246, 0.7);
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}`;
      })
      .join("\n");

    setCssCode(baseCss + itemCss);

    const html = `
<div class="grid-preview">
  ${items
    .map((_, i) => `<div class="item-${i + 1}">Item ${i + 1}</div>`)
    .join("\n  ")}
</div>`.trim();

    setHtmlCode(html);
  }, [columns, rows, gap, items]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("¡Copiado al portapapeles!");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">⚙️ CSS Grid Generator</h1>

      {/* Inputs para columnas, filas y gap */}
      <div className="flex gap-6 mb-6">
        <label className="flex flex-col items-start">
          <span className="font-bold">Columns</span>
          <input
            type="number"
            min={1}
            value={columns}
            onChange={(e) => setColumns(+e.target.value)}
            className="border rounded px-2 py-1 w-20"
          />
        </label>
        <label className="flex flex-col items-start">
          <span className="font-bold">Rows</span>
          <input
            type="number"
            min={1}
            value={rows}
            onChange={(e) => setRows(+e.target.value)}
            className="border rounded px-2 py-1 w-20"
          />
        </label>
        <label className="flex flex-col items-start">
          <span className="font-bold">Gap (px)</span>
          <input
            type="number"
            min={0}
            value={gap}
            onChange={(e) => setGap(+e.target.value)}
            className="border rounded px-2 py-1 w-20"
          />
        </label>
      </div>

      {/* Contenedor principal: grid a la izquierda, visualizador a la derecha */}
      <div className="flex gap-8 w-full max-w-5xl">
        <div className="w-[400px]">
          <GridEditor
            rows={rows}
            columns={columns}
            selectedAreas={items}
            onSelectionChange={handleNewItem}
          />
        </div>

        <div className="flex flex-col flex-grow">
          <div
            className="grid-preview flex-grow mb-4"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: `${gap}px`,
              height: 300,
              border: "1px solid #ccc",
              background: "#eee",
              position: "relative",
              borderRadius: 8,
            }}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`item-${i + 1}`}
                style={{
                  gridColumn: `${item.startCol} / ${item.endCol + 1}`,
                  gridRow: `${item.startRow} / ${item.endRow + 1}`,
                  backgroundColor: "rgba(59, 130, 246, 0.7)",
                  borderRadius: "6px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="self-end bg-blue-950 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            🔄 Reset Selecciones
          </button>
        </div>
      </div>

      <div className="flex gap-6 w-full max-w-5xl flex-col md:flex-row mt-10">
        <div className="flex-1 relative bg-gray-200 rounded-md p-4 mb-6 md:mb-0">
          <button
            className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-600"
            onClick={() => copyToClipboard(cssCode)}
          >
            📋 Copy CSS
          </button>
          <pre className="whitespace-pre-wrap overflow-auto max-h-112">
            {cssCode}
          </pre>
        </div>
        <div className="flex-1 relative bg-gray-200 rounded-md p-4">
          <button
            className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-600"
            onClick={() => copyToClipboard(htmlCode)}
          >
            📋 Copy HTML
          </button>
          <pre className="whitespace-pre-wrap overflow-auto max-h-112">
            {htmlCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;
