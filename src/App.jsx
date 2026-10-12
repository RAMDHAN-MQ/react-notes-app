import { useState, useEffect } from "react";

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

function Nav({ isDark, setIsDark }) {
  return (
    <nav className="flex justify-between pt-6 items-center">
      <h1 className="text-4xl font-bold">Notes</h1>
      <Button
        text={isDark ? "Light" : "Dark"}
        jenis={isDark ? "light" : "dark"}
        onClick={() => setIsDark(!isDark)}
      />
    </nav>
  );
}

function Note({ data, onHapusNote, onFilterEdit }) {
  return (
    <div className="note p-4 bg-amber-300 rounded-2xl flex flex-col justify-between min-h-70 max-h-70 dark:text-coklat dark:bg-gray-600">
      <div className="isi wrap-break-word">
        <span className="text-xl">{data.text}</span>
      </div>
      <div className="footer flex gap-3 items-center justify-between">
        <span>{data.date}</span>
        <div className="flex gap-2">
          <Button text={"Edit"} jenis={"action"} onClick={onFilterEdit} />
          <Button text={"Hapus"} jenis={"action"} onClick={onHapusNote} />
        </div>
      </div>
    </div>
  );
}

function TambahNote({ onTambahNote, isEdit, onEditNote, edit }) {
  const [text, setText] = useState(() => {
    return edit ? edit.text : "";
  });

  const max = 100 - text.length;

  function handleKirimNote() {
    if (text.length === 0) return;
    if (isEdit) {
      onEditNote(text);
    } else {
      onTambahNote(text);
    }
    setText("");
  }

  function handleBtnBatal() {
    location.reload();
  }

  return (
    <div className="note min-w-0 p-4 bg-biru rounded-2xl flex flex-col justify-between min-h-70 max-h-70 dark:text-gray-800 dark:bg-cyan-800">
      <div className="isi wrap-break-word">
        <textarea
          rows={7}
          className="w-full text-xl outline-0 resize-none dark:text-coklat"
          placeholder="Ketikan Sesuatu..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={100}
        ></textarea>
      </div>
      <div className="footer flex gap-3 items-center justify-between">
        <span className="dark:text-coklat">{max}</span>
        <div className="flex gap-2">
          <Button
            text={"Batal"}
            jenis={"action"}
            display={edit ? "" : "hidden"}
            onClick={handleBtnBatal}
          />
          <Button
            text={edit ? "Update" : "Simpan"}
            jenis={"action"}
            onClick={handleKirimNote}
          />
        </div>
      </div>
    </div>
  );
}

function Button({ text, jenis, onClick, display }) {
  let warna;
  switch (jenis) {
    case "action":
      warna =
        "text-gray-800 border active:bg-gray-800 active:text-coklat dark:border-coklat dark:text-coklat";
      break;
    case "dark":
      warna = "text-coklat bg-gray-800";
      break;
    case "light":
      warna = "text-gray-800 bg-coklat";
      break;
    default:
      warna = "";
  }
  return (
    <button
      className={`py-2 px-3 rounded cursor-pointer ${warna} ${display}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
