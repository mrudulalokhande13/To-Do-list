# TaskNote — To-Do & Notes App

Minor Project 04 — Web Development / React.js

## Project Overview
TaskNote is a responsive React application containing two productivity tools:
1. To-Do App for managing daily tasks.
2. Notes App for creating and organizing notes.

Data is stored in the browser using Local Storage, so tasks and notes remain available after refreshing the page.

## Features

### To-Do App
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Display completed/pending status
- Filter All / Pending / Completed
- Search tasks
- Add due dates
- Local Storage

### Notes App
- Create notes
- Edit notes
- Delete notes
- Organized card layout
- Search notes
- Categorize notes
- Local Storage
- Note timestamps

### Dashboard
- Task statistics
- Recent tasks
- Recent notes
- Quick navigation

## React Concepts Demonstrated
- Functional Components
- JSX
- Props
- useState
- useEffect
- Conditional Rendering
- List Rendering with map()
- Component Reusability
- Event Handling

## JavaScript Concepts
- Arrow Functions
- Template Literals
- Destructuring
- Spread Operator
- let / const
- map()
- filter()
- find()
- Object manipulation

## Technologies Used
- React.js
- Vite
- JavaScript ES6+
- HTML5
- CSS3
- Lucide React icons
- Browser Local Storage

## Project Structure
```text
minor-project-04-react/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Setup Instructions

### 1. Install Node.js
Install Node.js LTS from the official Node.js website.

### 2. Open the project
Extract the ZIP file and open the project folder in VS Code.

### 3. Install dependencies
```bash
npm install
```

### 4. Start development server
```bash
npm run dev
```

Open the local URL shown by Vite, usually:
```text
http://localhost:5173
```

### 5. Create production build
```bash
npm run build
```

## GitHub Upload

```bash
git init
git add .
git commit -m "Minor Project 04 - React To-Do and Notes App"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Submission
Submit the GitHub repository link through the Minor Project submission form according to your LMS instructions.

## Academic Note
This project is structured to demonstrate the React and JavaScript concepts listed in the Minor Project 04 assignment.
