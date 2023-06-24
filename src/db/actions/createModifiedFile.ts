import { ModifiedFile } from "../../../types";
import { DB_NAME, Stores } from "../useIndexedDB";

export function createModifiedFile(
  data: Omit<ModifiedFile, "id">
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      reject(new Error("Failed to open database"));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      const transaction = db.transaction(Stores.ModifiedFile, "readwrite");
      const objectStore = transaction.objectStore(Stores.ModifiedFile);

      const addRequest = objectStore.add(data);

      addRequest.onsuccess = () => {
        resolve();
      };

      addRequest.onerror = () => {
        reject(new Error("Failed to add data to database"));
      };
    };
  });
}
