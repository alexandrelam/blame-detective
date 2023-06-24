import { ModifiedFile } from "../../../types";
import { DB_NAME, Stores } from "../useIndexedDB";

export function findByDateModifiedFile(date: Date): Promise<ModifiedFile[]> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      reject(new Error("Failed to open database"));
    };

    request.onsuccess = () => {
      const db = request.result;

      const transaction = db.transaction(Stores.ModifiedFile, "readonly");
      const objectStore = transaction.objectStore(Stores.ModifiedFile);
      const index = objectStore.index("date");

      const range = IDBKeyRange.only(date);
      const getRequest = index.getAll(range);

      getRequest.onsuccess = () => {
        const retrievedData: ModifiedFile[] = getRequest.result;
        resolve(retrievedData);
      };

      getRequest.onerror = () => {
        reject(new Error("Failed to retrieve data from the database"));
      };
    };
  });
}
