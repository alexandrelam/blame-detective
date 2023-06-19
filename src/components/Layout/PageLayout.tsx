export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-8">
      <h2 className="font-bold text-xl text-secondary">{title}</h2>
      <div className="py-4">{children}</div>
    </div>
  );
}
