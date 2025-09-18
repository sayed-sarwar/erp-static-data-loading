// import React, { useState, useRef, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export type BlockType = "text" | "chart" | "table" | "image";
// export type Block = { id: string; type: BlockType; props: Record<string, any>; };

// const defaultBlockProps = {
//   text: { title: "Heading", body: "Write something..." },
//   chart: { title: "Bar Chart", data: [
//     { name: "Jan", sales: 4000, revenue: 2400 },
//     { name: "Feb", sales: 3000, revenue: 1398 },
//     { name: "Mar", sales: 2000, revenue: 9800 },
//     { name: "Apr", sales: 2780, revenue: 3908 }
//   ] },
//   table: { title: "Table Title", columns: ["Col 1", "Col 2"], rows: [["A","B"]] },
//   image: { title: "Image", src: "", alt: "" },
// };

// const uid = (prefix = "b") => prefix + Math.random().toString(36).slice(2, 9);

// export default function ReportBuilder() {
//   const [blocks, setBlocks] = useState<Block[]>(() => {
//     try { const raw = localStorage.getItem("rb.blocks.demo"); if (raw) return JSON.parse(raw); } catch (e) {}
//     return [ { id: uid(), type: "text", props: { ...defaultBlockProps.text } }, { id: uid(), type: "chart", props: { ...defaultBlockProps.chart } } ];
//   });

//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [isPreview, setIsPreview] = useState(false);
//   const dragItemRef = useRef<number | null>(null);
//   const dragOverItemRef = useRef<number | null>(null);

//   useEffect(() => { localStorage.setItem("rb.blocks.demo", JSON.stringify(blocks)); }, [blocks]);

//   function addBlock(type: BlockType, atIndex?: number) {
//     const block: Block = { id: uid(), type, props: { ...defaultBlockProps[type] } };
//     setBlocks(prev => { if (typeof atIndex === "number") { const copy = [...prev]; copy.splice(atIndex, 0, block); return copy; } return [...prev, block]; });
//     setSelectedId(block.id);
//   }

//   function updateBlock(id: string, patch: Partial<Block["props"]>) {
//     setBlocks(prev => prev.map(b => (b.id === id ? { ...b, props: { ...b.props, ...patch } } : b)));
//   }

//   function removeBlock(id: string) { setBlocks(prev => prev.filter(b => b.id !== id)); if (selectedId === id) setSelectedId(null); }
//   function onDragStartList(e: React.DragEvent, position: number) { dragItemRef.current = position; e.dataTransfer.effectAllowed = "move"; }
//   function onDragEnterList(e: React.DragEvent, position: number) { dragOverItemRef.current = position; }
//   function onDragEndList() {
//     const start = dragItemRef.current; const end = dragOverItemRef.current;
//     if (start === null || end === null) return;
//     setBlocks(prev => { const copy = Array.from(prev); const [removed] = copy.splice(start, 1); copy.splice(end, 0, removed); return copy; });
//     dragItemRef.current = null; dragOverItemRef.current = null;
//   }

//   function exportJSON() { const dataStr = JSON.stringify(blocks, null, 2); const blob = new Blob([dataStr], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "report.json"; a.click(); URL.revokeObjectURL(url); }
//   function importJSON(file: File | null) { if (!file) return; const reader = new FileReader(); reader.onload = e => { try { const parsed = JSON.parse(String(e.target?.result || "[]")); if (Array.isArray(parsed)) setBlocks(parsed); else alert("Invalid file format: expected an array of blocks."); } catch (err) { alert("Failed to parse JSON file."); } }; reader.readAsText(file); }
//   function saveTemplate(name: string) { const templates = JSON.parse(localStorage.getItem("rb.templates") || "{}"); templates[name] = blocks; localStorage.setItem("rb.templates", JSON.stringify(templates)); alert(`Saved template: ${name}`); }
//   function loadTemplate(name: string) { const templates = JSON.parse(localStorage.getItem("rb.templates") || "{}"); if (templates[name]) setBlocks(templates[name]); else alert("Template not found"); }

//   const selectedBlock = blocks.find(b => b.id === selectedId) || null;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
//         {/* Sidebar */}
//         <aside className="col-span-3 bg-white rounded-2xl shadow p-4 sticky top-6 h-[80vh] overflow-auto">
//           <h3 className="text-lg font-semibold mb-3">Components</h3>
//           <div className="space-y-3">
//             {([{ t: "text", label: "Text" }, { t: "chart", label: "Bar Chart" }, { t: "table", label: "Table" }, { t: "image", label: "Image" }] as { t: BlockType; label: string }[]).map(c => (
//               <div key={c.t} draggable onDragStart={e => { e.dataTransfer.setData("application/x-rb-comp", c.t); }} className="cursor-grab p-3 border rounded-lg hover:shadow-sm">
//                 <div className="font-medium">{c.label}</div>
//                 <div className="text-xs text-gray-500 mt-1">Drag to add</div>
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* Canvas */}
//         <main className="col-span-6 bg-white rounded-2xl shadow p-4 min-h-[80vh]" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const comp = e.dataTransfer.getData("application/x-rb-comp"); if (comp) addBlock(comp as BlockType); }}>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Report Canvas</h2>
//             <div className="text-sm text-gray-500">Blocks: {blocks.length}</div>
//           </div>
//           {blocks.length === 0 && (<div className="p-12 border-dashed border-2 rounded-lg text-center text-gray-400">Drop components here to build your report</div>)}
//           <div className="space-y-4">
//             {blocks.map((b, idx) => (
//               <div key={b.id} draggable={!isPreview} onDragStart={e => onDragStartList(e, idx)} onDragEnter={e => onDragEnterList(e, idx)} onDragEnd={onDragEndList} onClick={() => setSelectedId(b.id)} className={`p-4 rounded-xl border flex justify-between items-start cursor-pointer transition-shadow ${selectedId === b.id ? "ring-2 ring-indigo-300" : "hover:shadow"}`}>
//                 <div className="flex-1"><BlockRenderer block={b} isPreview={isPreview} /></div>
//                 <div className="ml-4 flex flex-col gap-2">
//                   <button title="Duplicate" onClick={e => { e.stopPropagation(); const newBlock: Block = { id: uid(), type: b.type, props: JSON.parse(JSON.stringify(b.props)) }; setBlocks(prev => { const copy = [...prev]; copy.splice(idx + 1, 0, newBlock); return copy; }); }} className="p-2 border rounded">+</button>
//                   <button title="Delete" onClick={e => { e.stopPropagation(); removeBlock(b.id); }} className="p-2 border rounded">-</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function BlockRenderer({ block, isPreview }: { block: Block; isPreview: boolean }) {
//   const { type, props } = block;
//   switch (type) {
//     case "text":
//       return (<div><h3 className="text-lg font-semibold">{props.title}</h3><p className="mt-2 text-sm text-gray-700">{props.body}</p></div>);
//     case "chart": {
//       let data = props.data || [];
//       const xKey = Object.keys(data[0] || {}).find(k => typeof data[0][k] !== 'number') || 'name';
//       const yKeys = Object.keys(data[0] || {}).filter(k => k !== xKey);
//       const colors = ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'];
//       return (
//         <div>
//           <h3 className="text-lg font-semibold">{props.title}</h3>
//           <div className="mt-3 p-6 border rounded">
//             {data.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                   <XAxis dataKey={xKey} />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   {yKeys.map((key, idx) => <Bar key={key} dataKey={key} fill={colors[idx % colors.length]} />)}
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="text-sm text-gray-500 text-center">No data</div>
//             )}
//           </div>
//         </div>
//       );
//     }
//     case "table":
//       return (<div><h3 className="text-lg font-semibold">{props.title}</h3><div className="mt-3 overflow-auto"><table className="min-w-full text-sm"><thead><tr>{(props.columns || []).map((c: string, i: number) => <th key={i}>{c}</th>)}</tr></thead><tbody>{(props.rows || []).map((r: any[], i: number) => <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody></table></div></div>);
//     case "image":
//       return (<div><h3 className="text-lg font-semibold">{props.title}</h3><img className="mt-3 rounded max-w-full" src={props.src} alt={props.alt} /></div>);
//     default: return null;
//   }
// }
