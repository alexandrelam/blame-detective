type Props = {
  title: string;
  releaseDate: string;
  features: React.ReactNode;
  bugFixes: React.ReactNode;
};
export function PatchNoteEntry({
  title,
  releaseDate,
  features,
  bugFixes,
}: Props) {
  return (
    <div>
      <h3 className="font-medium text-lg mt-4 text-primary-content">{title}</h3>
      <span className="text-sm -mt-1 text-base-content block">
        Release Date: {releaseDate}
      </span>
      <h4 className="font-bold mt-2 text-secondary-content">New ✨</h4>
      <ul className="list-decimal mx-5 text-secondary-content">{features}</ul>
      <h4 className="font-bold mt-2 text-secondary-content">Bug fix 🐛</h4>
      <ul className="list-decimal mx-5 text-secondary-content">{bugFixes}</ul>
    </div>
  );
}
