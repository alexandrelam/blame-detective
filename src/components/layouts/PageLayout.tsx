export function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-8 flex flex-col flex-grow">
      <div className="flex items-baseline gap-2">
        <h2 className="font-bold text-xl text-secondary">{title}</h2>
        <h3 className="text-neutral font-medium">{subtitle}</h3>
      </div>
      <div className="py-4 flex-grow">{children}</div>
    </div>
  );
}
