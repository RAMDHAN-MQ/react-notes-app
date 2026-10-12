import Button from "./Button";

export default function Note({ data, onHapusNote, onFilterEdit }) {
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
