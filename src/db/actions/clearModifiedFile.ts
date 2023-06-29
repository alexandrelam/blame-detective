import { DB_NAME, Stores } from "../useIndexedDB";

export async function clearModifiedFile(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onsuccess = () => {
      const db = request.result;

      const transaction = db.transaction([Stores.ModifiedFile], "readwrite");
      const objectStore = transaction.objectStore(Stores.ModifiedFile);

      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = () => {
        resolve();
      };

      clearRequest.onerror = () => {
        reject(new Error("Failed to clear ModifiedFile store"));
      };
    };

    request.onerror = () => {
      reject(new Error("Failed to open database"));
    };
  });
}
