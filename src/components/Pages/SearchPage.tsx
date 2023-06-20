import { useSearch } from "../../hooks/useSearch";
import { PageLayout } from "../Layout/PageLayout";

export function SearchPage() {
  const { makeSearch, isLoading, modifiedFiles } = useSearch();
  return (
    <PageLayout title="Search">
      <div className="flex gap-2 h-full">
        <div className="bg-green-100 w-64">tree view</div>
        <div className="flex flex-col gap-2 flex-grow">
          <form className="flex items-center join" onSubmit={makeSearch}>
            <input
              id="filepath"
              name="filepath"
              type="text"
              placeholder="Search /file/path..."
              className="input input-bordered flex-grow join-item"
            />
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="input input-bordered join-item"
            />
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="input input-bordered join-item"
            />
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
