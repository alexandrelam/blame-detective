export function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen max-h-screen	max-w-[1800px] px-4 m-auto overflow-hidden">
      {children}
    </div>
  );
}
