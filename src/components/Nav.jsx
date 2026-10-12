import Button from "./Button";

export default function Nav({ isDark, setIsDark }) {
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
