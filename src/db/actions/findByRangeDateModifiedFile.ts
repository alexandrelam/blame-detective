import { ModifiedFile } from "../../../types";
import { DB_NAME, Stores } from "../useIndexedDB";

export function findByRangeDateModifiedFile(
  startDate: Date,
  endDate: Date
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

      const range = IDBKeyRange.bound(startDate, endDate);
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
