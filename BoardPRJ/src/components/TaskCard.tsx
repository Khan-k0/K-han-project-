import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../type"; // ⬅️ 타입 전용 import

type Props = {
  id: string;
  task: Task;
  onDelete?: () => void;
};

export default function TaskCard({ id, task, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="task-card" {...attributes} {...listeners}>
      <strong>{task.title}</strong>
      {task.description && <p>{task.description}</p>}
      <button className="del-btn" onClick={onDelete}>삭제</button>
    </div>
  );
}
