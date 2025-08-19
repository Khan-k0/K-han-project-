import type { BoardState } from "./type";
import { nanoid } from "nanoid";

const t1 = nanoid(), t2 = nanoid(), t3 = nanoid();

export const initialBoard: BoardState = {
  tasks: {
    [t1]: { id: t1, title: "프로젝트 세팅", description: "Vite + TS 구성" },
    [t2]: { id: t2, title: "UI 와이어프레임", description: "컬럼/카드 구조" },
    [t3]: { id: t3, title: "드래그앤드롭", description: "dnd-kit 연결" },
  },
  columns: [
    { id: "todo", title: "To Do", taskIds: [t1, t2] },
    { id: "doing", title: "In Progress", taskIds: [t3] },
    { id: "done", title: "Done", taskIds: [] },
  ],
};
