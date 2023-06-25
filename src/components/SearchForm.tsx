import { SearchContext } from "../App";
import { ModifiedFile } from "../types";
import { useTypedContext } from "../hooks/useTypedContext";
import { useState } from "react";

type Props = {
  makeSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  modifiedFiles: ModifiedFile[];
};

export function SearchForm({ makeSearch, modifiedFiles }: Props) {
  const { setSearchQuery, setSearchFile, setExcludeFile } =
    useTypedContext(SearchContext);

  const [startDate, setStartDate] = useState("");

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  return (
    <form className="flex items-center join" onSubmit={makeSearch}>
      <input
        id="filepath"
        name="filepath"
        type="text"
        placeholder="Search in text: /^regex\/path$/i"
        className="input input-bordered flex-grow join-item"
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={modifiedFiles.length === 0}
      />

      <div className="dropdown">
        <button
          tabIndex={0}
          className="btn join-item"
          type="button"
          disabled={modifiedFiles.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-96"
        >
          <li>
            <input
              type="text"
              placeholder="Files to include (regex)"
              className="input"
              onChange={(e) => setSearchFile(e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Files to exclude (regex)"
              className="input"
              onChange={(e) => setExcludeFile(e.target.value)}
            />
          </li>
        </ul>
      </div>
      <input
        id="start_date"
        name="start_date"
        type="date"
        required
        className="input input-bordered join-item"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <input
        id="end_date"
        name="end_date"
        type="date"
        required
        className="input input-bordered join-item"
        min={startDate}
        disabled={!startDate}
      />
      <button className="btn btn-primary join-item" type="submit">
        Search
      </button>
    </form>
  );
}
