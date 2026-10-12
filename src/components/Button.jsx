export default function Button({ text, jenis, onClick, display }) {
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
