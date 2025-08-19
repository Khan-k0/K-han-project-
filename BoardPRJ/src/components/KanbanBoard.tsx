import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core"; // ⬅️ 타입 전용 import

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEffect, useMemo, useState } from "react";
import type { BoardState, Column as ColumnType, Task as TaskType } from "../type"; // ⬅️ 타입 전용
import { initialBoard } from "../data";
import Column from "./Column";
import TaskCard from "./TaskCard";

const STORAGE_KEY = "kanban-board-v1";

function loadState(): BoardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as BoardState;
  } catch {}
  return initialBoard;
}

export default function KanbanBoard() {
  const [board, setBoard] = useState<BoardState>(loadState);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const allTaskIds = useMemo<string[]>(
    () => board.columns.flatMap((c: ColumnType) => c.taskIds),
    [board.columns]
  );

  const getTaskById = (id: string) => board.tasks[id];

  const findColumnByTaskId = (taskId: string): ColumnType | undefined =>
    board.columns.find((col: ColumnType) => col.taskIds.includes(taskId));

  const findColumnById = (columnId: string): ColumnType | undefined =>
    board.columns.find((c: ColumnType) => c.id === columnId);

  function onDragStart(event: any) {
    const taskId = event.active?.id as string;
    const task = getTaskById(taskId);
    if (task) setActiveTask(task);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceCol = findColumnByTaskId(activeId);
    if (!sourceCol) return;

    const overIsTask = allTaskIds.includes(overId);

    let targetCol: ColumnType | undefined;
    let insertIndex = 0;

    if (overIsTask) {
      targetCol = findColumnByTaskId(overId);
      if (!targetCol) return;
      insertIndex = targetCol.taskIds.indexOf(overId);
    } else {
      targetCol = findColumnById(overId);
      if (!targetCol) return;
      insertIndex = targetCol.taskIds.length;
    }

    if (sourceCol.id === targetCol.id && overIsTask) {
      const srcIndex = sourceCol.taskIds.indexOf(activeId);
      const dstIndex = insertIndex;
      if (srcIndex === dstIndex || srcIndex + 1 === dstIndex) return;
    }

    setBoard((prev: BoardState) => {
      const columns: ColumnType[] = prev.columns.map((c: ColumnType) => ({
        ...c,
        taskIds: [...c.taskIds],
      }));

      const src = columns.find((c: ColumnType) => c.id === sourceCol!.id)!;
      const dst = columns.find((c: ColumnType) => c.id === targetCol!.id)!;

      const fromIndex = src.taskIds.indexOf(activeId);
      if (fromIndex >= 0) src.taskIds.splice(fromIndex, 1);

      if (src.id === dst.id) {
        const toIndex = overIsTask && insertIndex > fromIndex ? insertIndex - 1 : insertIndex;
        src.taskIds.splice(toIndex, 0, activeId);
      } else {
        dst.taskIds.splice(insertIndex, 0, activeId);
      }

      return { ...prev, columns };
    });
  }

  function addTask(columnId: string) {
    const title = prompt("새 카드 제목:");
    if (!title) return;
    const id = crypto.randomUUID();
    const newTask: TaskType = { id, title };
    setBoard((prev: BoardState) => ({
      tasks: { ...prev.tasks, [id]: newTask },
      columns: prev.columns.map((c: ColumnType) =>
        c.id === columnId ? { ...c, taskIds: [id, ...c.taskIds] } : c
      ),
    }));
  }

  function deleteTask(taskId: string) {
    setBoard((prev: BoardState) => {
      const tasks = { ...prev.tasks };
      delete tasks[taskId];
      const columns = prev.columns.map((c: ColumnType) => ({
        ...c,
        taskIds: c.taskIds.filter((id: string) => id !== taskId),
      }));
      return { tasks, columns };
    });
  }

  return (
    <div className="board">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="columns">
          {board.columns.map((col: ColumnType) => (
            <div key={col.id} className="column-wrap">
              <div className="column-header">
                <h3>{col.title}</h3>
                <button className="add-btn" onClick={() => addTask(col.id)}>+ 카드</button>
              </div>

              <SortableContext items={col.taskIds} strategy={verticalListSortingStrategy}>
                <Column id={col.id}>
                  {col.taskIds.map((taskId: string) => (
                    <TaskCard
                      key={taskId}
                      id={taskId}
                      task={board.tasks[taskId]}
                      onDelete={() => deleteTask(taskId)}
                    />
                  ))}
                </Column>
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? (
            <div className="task-card dragging">
              <strong>{activeTask.title}</strong>
              {activeTask.description && <p>{activeTask.description}</p>}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
