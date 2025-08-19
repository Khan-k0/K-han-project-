import { useDroppable } from "@dnd-kit/core";
import type { PropsWithChildren } from "react"; // ⬅️ 타입 전용 import

type Props = PropsWithChildren<{ id: string }>;

export default function Column({ id, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`column ${isOver ? "over" : ""}`}>
      {children}
    </div>
  );
}
