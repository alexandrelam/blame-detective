import { PageLayout } from "../Layout/PageLayout";

export function SearchPage() {
  async function createModifiedFile() {
    await fetch("http://localhost:5175/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: "test",
        html_url: "zer",
        sha: "zer",
        path: "/test.txt",
        date: new Date().toISOString(),
      }),
    });
  }

  async function getFiles() {
    const res = await fetch("http://localhost:5175/files");
    const data = await res.json();
    console.log(data);
  }

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
          <div className="bg-red-100 flex-grow">
            content
            <button onClick={createModifiedFile}>create</button>
            <button onClick={getFiles}>fetch</button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
