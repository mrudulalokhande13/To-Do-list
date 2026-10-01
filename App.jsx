import React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2, Circle, ClipboardList, FileText, LayoutDashboard,
  ListTodo, Plus, Search, StickyNote, Trash2, Pencil, X,
  CalendarDays, Tag, Sparkles
} from "lucide-react";

const TODO_KEY = "tasknote_todos";
const NOTES_KEY = "tasknote_notes";

const initialTodos = [
  { id: 1, title: "Complete React Minor Project", dueDate: new Date().toISOString().slice(0, 10), completed: false, createdAt: Date.now() },
  { id: 2, title: "Review JavaScript ES6 concepts", dueDate: "", completed: true, createdAt: Date.now() - 86400000 }
];

const initialNotes = [
  {
    id: 1,
    title: "React Hooks",
    content: "useState manages component state and useEffect handles side effects.",
    category: "Study",
    createdAt: Date.now()
  },
  {
    id: 2,
    title: "Project Ideas",
    content: "Build useful, responsive applications with reusable components.",
    category: "Ideas",
    createdAt: Date.now() - 172800000
  }
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [todos, setTodos] = useState(() => loadData(TODO_KEY, initialTodos));
  const [notes, setNotes] = useState(() => loadData(NOTES_KEY, initialNotes));

  useEffect(() => localStorage.setItem(TODO_KEY, JSON.stringify(todos)), [todos]);
  useEffect(() => localStorage.setItem(NOTES_KEY, JSON.stringify(notes)), [notes]);

  const stats = useMemo(() => ({
    totalTasks: todos.length,
    completed: todos.filter((task) => task.completed).length,
    pending: todos.filter((task) => !task.completed).length,
    notes: notes.length
  }), [todos, notes]);

  const addTodo = (todo) => setTodos((current) => [{ ...todo, id: Date.now(), createdAt: Date.now() }, ...current]);
  const updateTodo = (id, changes) => setTodos((current) => current.map((task) => task.id === id ? { ...task, ...changes } : task));
  const deleteTodo = (id) => setTodos((current) => current.filter((task) => task.id !== id));

  const addNote = (note) => setNotes((current) => [{ ...note, id: Date.now(), createdAt: Date.now() }, ...current]);
  const updateNote = (id, changes) => setNotes((current) => current.map((note) => note.id === id ? { ...note, ...changes } : note));
  const deleteNote = (id) => setNotes((current) => current.filter((note) => note.id !== id));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Sparkles size={20} /></div>
          <div><strong>TaskNote</strong><span>React Workspace</span></div>
        </div>

        <nav>
          <p className="nav-label">Workspace</p>
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} />
          <NavItem icon={<ListTodo size={18} />} label="To-Do App" active={activePage === "todos"} onClick={() => setActivePage("todos")} count={stats.pending} />
          <NavItem icon={<StickyNote size={18} />} label="Notes App" active={activePage === "notes"} onClick={() => setActivePage("notes")} count={stats.notes} />
        </nav>

        <div className="sidebar-footer">
          <div className="mini-card">
            <CheckCircle2 size={20} />
            <div><b>{stats.completed}/{stats.totalTasks || 0}</b><span>tasks completed</span></div>
          </div>
          <small>Minor Project 04 • React.js</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">MINOR PROJECT 04</span>
            <h1>{activePage === "dashboard" ? "Your productivity space" : activePage === "todos" ? "To-Do App" : "Notes App"}</h1>
          </div>
          <div className="top-actions">
            <span className="status-dot"></span>
            <span>Saved locally</span>
          </div>
        </header>

        {activePage === "dashboard" && (
          <Dashboard stats={stats} todos={todos} notes={notes} goTodos={() => setActivePage("todos")} goNotes={() => setActivePage("notes")} />
        )}
        {activePage === "todos" && (
          <TodoPage todos={todos} addTodo={addTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        )}
        {activePage === "notes" && (
          <NotesPage notes={notes} addNote={addNote} updateNote={updateNote} deleteNote={deleteNote} />
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, count }) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      {icon}<span>{label}</span>{count !== undefined && <b>{count}</b>}
    </button>
  );
}

function Dashboard({ stats, todos, notes, goTodos, goNotes }) {
  const recentTasks = todos.slice(0, 4);
  const recentNotes = notes.slice(0, 3);

  return (
    <section className="page">
      <div className="hero">
        <div>
          <span className="pill"><Sparkles size={14}/> Stay organized</span>
          <h2>Plan it. Write it.<br/><em>Get it done.</em></h2>
          <p>Manage daily tasks and keep your important notes in one clean React workspace.</p>
        </div>
        <div className="hero-art"><ClipboardList size={80} strokeWidth={1.2}/></div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Tasks" value={stats.totalTasks} icon={<ListTodo />} />
        <StatCard label="Completed" value={stats.completed} icon={<CheckCircle2 />} />
        <StatCard label="Pending" value={stats.pending} icon={<Circle />} />
        <StatCard label="Notes" value={stats.notes} icon={<FileText />} />
      </div>

      <div className="two-column">
        <section className="panel">
          <PanelHeader title="Recent Tasks" action="View all" onClick={goTodos} />
          {recentTasks.length ? recentTasks.map((task) => (
            <div className="compact-row" key={task.id}>
              {task.completed ? <CheckCircle2 className="done-icon" size={20}/> : <Circle size={20}/>}
              <span className={task.completed ? "strike" : ""}>{task.title}</span>
              <small>{task.completed ? "Completed" : "Pending"}</small>
            </div>
          )) : <Empty text="No tasks yet." />}
        </section>

        <section className="panel">
          <PanelHeader title="Recent Notes" action="View all" onClick={goNotes} />
          {recentNotes.length ? recentNotes.map((note) => (
            <div className="note-preview" key={note.id}>
              <div className="note-icon"><StickyNote size={17}/></div>
              <div><b>{note.title}</b><p>{note.content}</p></div>
              <span>{note.category}</span>
            </div>
          )) : <Empty text="No notes yet." />}
        </section>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong></div></div>;
}

function PanelHeader({ title, action, onClick }) {
  return <div className="panel-header"><h3>{title}</h3><button onClick={onClick}>{action} →</button></div>;
}

function TodoPage({ todos, addTodo, updateTodo, deleteTodo }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const visible = todos.filter((task) => {
    const matchesFilter = filter === "all" || (filter === "completed" ? task.completed : !task.completed);
    return matchesFilter && task.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <section className="page">
      <div className="section-intro">
        <div><p>Organize your daily activities</p><h2>Tasks that move you forward.</h2></div>
        <button className="primary-btn" onClick={() => setEditing({ mode: "add" })}><Plus size={18}/> Add Task</button>
      </div>

      <div className="toolbar">
        <div className="segmented">
          {["all", "pending", "completed"].map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}
        </div>
        <label className="search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." /></label>
      </div>

      <div className="task-list">
        {visible.length ? visible.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={() => updateTodo(task.id, { completed: !task.completed })} onEdit={() => setEditing({ mode: "edit", task })} onDelete={() => deleteTodo(task.id)} />
        )) : <Empty text="No matching tasks. Add a new task to get started." />}
      </div>

      {editing && (
        <TodoModal
          task={editing.task}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            if (editing.mode === "add") addTodo(data);
            else updateTodo(editing.task.id, data);
            setEditing(null);
          }}
        />
      )}
    </section>
  );
}

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? "completed-task" : ""}`}>
      <button className="check-btn" onClick={onToggle}>{task.completed ? <CheckCircle2 size={25}/> : <Circle size={25}/>}</button>
      <div className="task-main">
        <h3>{task.title}</h3>
        <div className="meta">{task.dueDate && <span><CalendarDays size={14}/> Due {new Date(task.dueDate + "T00:00:00").toLocaleDateString()}</span>}<span className={task.completed ? "green" : "orange"}>{task.completed ? "Completed" : "Pending"}</span></div>
      </div>
      <div className="item-actions"><button onClick={onEdit} aria-label="Edit"><Pencil size={17}/></button><button onClick={onDelete} aria-label="Delete"><Trash2 size={17}/></button></div>
    </article>
  );
}

function TodoModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task?.title || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), dueDate, completed: task?.completed || false });
  };

  return <Modal title={task ? "Edit Task" : "Add New Task"} onClose={onClose}>
    <form onSubmit={submit}>
      <label>Task title<input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Complete assignment" /></label>
      <label>Due date<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></label>
      <button className="primary-btn full" type="submit">{task ? "Save Changes" : "Add Task"}</button>
    </form>
  </Modal>;
}

function NotesPage({ notes, addNote, updateNote, deleteNote }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [editing, setEditing] = useState(null);

  const categories = ["All", ...new Set(notes.map((note) => note.category).filter(Boolean))];
  const visible = notes.filter((note) =>
    (category === "All" || note.category === category) &&
    `${note.title} ${note.content}`.toLowerCase().includes(query.toLowerCase())
  );

  return <section className="page">
    <div className="section-intro">
      <div><p>Capture ideas and knowledge</p><h2>Your notes, neatly organized.</h2></div>
      <button className="primary-btn" onClick={() => setEditing({ mode: "add" })}><Plus size={18}/> New Note</button>
    </div>

    <div className="notes-toolbar">
      <label className="search large"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes..." /></label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select>
    </div>

    <div className="notes-grid">
      {visible.length ? visible.map((note) => <NoteCard key={note.id} note={note} onEdit={() => setEditing({ mode: "edit", note })} onDelete={() => deleteNote(note.id)} />) : <Empty text="No notes found." />}
    </div>

    {editing && <NoteModal note={editing.note} onClose={() => setEditing(null)} onSave={(data) => { editing.mode === "add" ? addNote(data) : updateNote(editing.note.id, data); setEditing(null); }} />}
  </section>;
}

function NoteCard({ note, onEdit, onDelete }) {
  return <article className="note-card">
    <div className="note-card-top"><span className="category"><Tag size={13}/> {note.category}</span><div className="item-actions"><button onClick={onEdit}><Pencil size={16}/></button><button onClick={onDelete}><Trash2 size={16}/></button></div></div>
    <h3>{note.title}</h3>
    <p>{note.content}</p>
    <footer>Updated {formatDate(note.createdAt)}</footer>
  </article>;
}

function NoteModal({ note, onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "Study");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title: title.trim(), content: content.trim(), category });
  };

  return <Modal title={note ? "Edit Note" : "Create Note"} onClose={onClose}>
    <form onSubmit={submit}>
      <label>Title<input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" /></label>
      <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Study</option><option>Personal</option><option>Ideas</option><option>Work</option><option>Other</option></select></label>
      <label>Content<textarea rows="6" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your note here..." /></label>
      <button className="primary-btn full" type="submit">{note ? "Save Changes" : "Create Note"}</button>
    </form>
  </Modal>;
}

function Modal({ title, onClose, children }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal"><div className="modal-header"><h3>{title}</h3><button onClick={onClose}><X size={19}/></button></div>{children}</div>
  </div>;
}

function Empty({ text }) {
  return <div className="empty"><FileText size={30}/><p>{text}</p></div>;
}

export default App;