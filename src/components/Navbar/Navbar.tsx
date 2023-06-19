import { ThemePicker } from "./ThemePicker";

export function NavBar() {
  return (
    <div className="py-6 border-b flex justify-between items-center">
      <h1 className="font-bold text-2xl">🕵️ &nbsp; GitHunt</h1>
      <ThemePicker />
    </div>
  );
}
