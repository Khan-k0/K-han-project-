
# React Project - Kanban Board

![React](https://img.shields.io/badge/React-18.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blueviolet)
![Vite](https://img.shields.io/badge/Vite-4.x-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 소개

이 프로젝트는 **React + Vite + TypeScript** 기반으로 제작된 **Kanban 보드 애플리케이션**입니다.
Drag & Drop을 통해 할 일을 관리할 수 있으며, 컴포넌트 구조와 상태 관리 학습을 위해 개발되었습니다.

---

## 🚀 주요 기능

* ⚛️ React 컴포넌트 기반 Kanban UI
* 📝 작업(Task) 추가 및 삭제
* 🔀 Drag & Drop을 통한 작업 이동
* 🎨 CSS 변수 기반 다크/라이트 테마 지원
* ⚡️ Vite 개발 환경으로 빠른 빌드

---

## 🛠️ 기술 스택

* React 18
* TypeScript
* Vite
* Node.js 18+
* npm (또는 yarn)

---

## 📂 프로젝트 구조

```bash
📦 my-app
 ┣ 📂 public            # 정적 파일
 ┣ 📂 src
 ┃ ┣ 📂 components      # Kanban UI 컴포넌트 (Column, TaskCard, KanbanBoard)
 ┃ ┣ 📂 assets          # 이미지, 아이콘 등 (필요 시)
 ┃ ┣ 📜 App.tsx         # 메인 컴포넌트
 ┃ ┣ 📜 main.tsx        # ReactDOM 렌더링 엔트리
 ┃ ┣ 📜 data.ts         # 샘플 데이터
 ┃ ┣ 📜 style.css       # 글로벌 스타일
 ┃ ┗ 📜 type.ts         # 타입 정의
 ┣ 📜 package.json      # 의존성 설정
 ┣ 📜 tsconfig.json     # TypeScript 설정
 ┣ 📜 vite.config.ts    # Vite 설정
 ┗ 📜 README.md
```

---

## ⚙️ 실행 방법

### 1. 클론

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd my-app
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

👉 실행 후 브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

---

## 📌 앞으로 할 일 (Todo)

* [ ] 카드 수정 기능
* [ ] 사용자 지정 컬럼 추가
* [ ] Drag & Drop 애니메이션 개선
* [ ] Firebase 등 외부 DB 연동

---

## 📜 라이선스

MIT License. 자유롭게 사용 가능합니다.

---

이렇게 하면 기존 README의 **구조 스타일**을 유지하면서도,
지금 만든 **Kanban 보드 프로젝트에 딱 맞는 README**가 돼요 ✅

👉 원하시면 제가 이 README를 **영문 버전**으로도 정리해드릴까요? (GitHub에서 해외 개발자들도 볼 수 있게)
