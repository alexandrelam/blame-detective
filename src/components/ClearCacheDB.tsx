import { clearModifiedFile } from "../db/actions/clearModifiedFile";

export function ClearCacheDB() {
  return (
    <>
      <button
        className="btn btn-lg btn-warning"
        onClick={() => window.delete_db_modal.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <span>Reset</span>
      </button>
      <dialog id="delete_db_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure about that?</h3>
          <p className="py-4">
            This action will delete all the data stored in your local database.
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => window.delete_db_modal.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-accent"
              onClick={() => {
                clearModifiedFile();
                return window.delete_db_modal.close();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
