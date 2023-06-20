import { PageLayout } from "../Layout/PageLayout";

export function SearchPage() {
  return (
    <PageLayout title="Search">
      <div className="flex gap-2 h-full">
        <div className="bg-green-100 w-64">tree view</div>
        <div className="flex flex-col gap-2 flex-grow">
          <form className="flex items-center join">
            <input
              type="text"
              placeholder="Search /file/path..."
              className="input input-bordered flex-grow join-item"
            />
            <input type="date" className="input input-bordered join-item" />
            <input type="date" className="input input-bordered join-item" />
            <button className="btn btn-primary join-item" type="submit">
              Search
            </button>
          </form>
          <div className="bg-red-100 flex-grow">content</div>
        </div>
      </div>
    </PageLayout>
  );
}
