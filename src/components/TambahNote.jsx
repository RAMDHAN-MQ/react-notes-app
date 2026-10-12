import { useState } from "react";
import Button from "./Button";

export default function TambahNote({ onTambahNote, isEdit, onEditNote, edit }) {
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
