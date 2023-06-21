import { SettingsMissingBanner } from "../SettingsMissingBanner";

export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const owner = localStorage.getItem("owner");
  const repo = localStorage.getItem("repo");

  return (
    <div className="py-8 flex flex-col flex-grow">
      {(!owner || !repo) && (
        <div className="mb-4">
          <SettingsMissingBanner />
        </div>
      )}
      <div className="flex items-baseline gap-2">
        <h2 className="font-bold text-xl text-secondary">{title}</h2>
        {!!owner && !!repo && (
          <h3 className="text-neutral font-medium">
            {owner}/{repo}
          </h3>
        )}
      </div>
      <div className="py-4 flex-grow">{children}</div>
    </div>
  );
}
