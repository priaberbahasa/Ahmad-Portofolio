"use client";
import { useRef, useState } from "react";

// Reusable drag-reorder list. Renders each item via `renderItem`.
// Calls onChange with the reordered array. No external deps.
export default function DragList<T>({
  items,
  onChange,
  renderItem,
  keyOf,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  keyOf: (item: T, index: number) => string;
}) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragElRef = useRef<HTMLDivElement | null>(null);

  function handleDragStart(i: number) {
    setDragIdx(i);
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    setOverIdx(i);
  }

  function handleDrop(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) { setDragIdx(null); setOverIdx(null); return; }
    const copy = items.slice();
    const [moved] = copy.splice(dragIdx, 1);
    copy.splice(i, 0, moved);
    onChange(copy);
    setDragIdx(null); setOverIdx(null);
  }

  return (
    <div ref={dragElRef}>
      {items.map((item, i) => (
        <div
          key={keyOf(item, i)}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={(e) => handleDrop(e, i)}
          onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
          style={{
            display: "grid",
            gridTemplateColumns: "24px 1fr auto",
            gap: 10,
            alignItems: "start",
            padding: "10px 12px",
            marginBottom: 6,
            borderRadius: "var(--r)",
            border: `1px solid ${overIdx === i ? "var(--ink)" : "var(--line)"}`,
            background: dragIdx === i ? "var(--surface-2)" : "var(--surface)",
            cursor: "move",
            transition: "border-color .12s, background .12s",
          }}
        >
          <div style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 14, userSelect: "none", paddingTop: 2 }} title="Drag to reorder">⋮⋮</div>
          <div>{renderItem(item, i)}</div>
        </div>
      ))}
    </div>
  );
}
