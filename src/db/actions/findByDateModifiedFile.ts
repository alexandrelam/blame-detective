import { ModifiedFile } from "../../types";
import { DB_NAME, Stores } from "../useIndexedDB";

export function findByDateModifiedFile(
  date: Date,
  repo: string,
  owner: string
): Promise<ModifiedFile[]> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      reject(new Error("Failed to open database"));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      const transaction = db.transaction(Stores.ModifiedFile, "readonly");
      const objectStore = transaction.objectStore(Stores.ModifiedFile);
      const index = objectStore.index("date");

      const range = IDBKeyRange.only(date);

      const retrievedData: ModifiedFile[] = [];

      const cursorRequest = index.openCursor(range);

      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;

        if (cursor) {
          const file = cursor.value as ModifiedFile;

          if (file.owner === owner && file.repo === repo) {
            retrievedData.push(file);
          }

          cursor.continue();
        } else {
          resolve(retrievedData);
        }
      };

      cursorRequest.onerror = () => {
        reject(new Error("Failed to retrieve data from the database"));
      };
    };
  });
}
