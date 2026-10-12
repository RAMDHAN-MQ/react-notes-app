import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import TambahNote from "./components/TambahNote";
import Note from "./components/Note";

export default function App() {
  const [note, setNote] = useState(() => {
    const data = localStorage.getItem("note");

    return data ? JSON.parse(data) : [];
  });
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState({});
  const [isDark, setIsDark] = useState(() => {
    const tema = localStorage.getItem("tema");
    return tema ? JSON.parse(tema) : false;
  });

  useEffect(() => {
    localStorage.setItem("tema", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(note));
  }, [note]);

  function handleTambahNote(text) {
    const baru = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleString().slice(0, 10),
    };

    setNote((data) => [...data, baru]);
  }

  function handleHapusNote(id) {
    const filter = note.filter((e) => e.id !== id);
    setNote(filter);
  }

  function handleEditNote(text) {
    const dataEdit = { ...edit, text: text };
    setNote((data) => data.map((e) => (e.id === dataEdit.id ? dataEdit : e)));
    setEdit({});
    setIsEdit(false);
  }

  function handleFilterEdit(id) {
    const filter = note.find((e) => e.id === id);
    setEdit(filter);
    setIsEdit(true);
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-coklat text-gray-800 dark:bg-gray-800 dark:text-coklat">
        <div className="container mx-auto pl-2 pr-2 pb-2">
          <Nav isDark={isDark} setIsDark={setIsDark} />
          <div className="note-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {isEdit ? (
              <TambahNote
                edit={edit}
                onEditNote={handleEditNote}
                isEdit={isEdit}
              />
            ) : (
              <>
                {note.map((e) => (
                  <Note
                    key={e.id}
                    data={e}
                    onHapusNote={() => handleHapusNote(e.id)}
                    onFilterEdit={() => handleFilterEdit(e.id)}
                  />
                ))}
                <TambahNote onTambahNote={handleTambahNote} isEdit={isEdit} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
