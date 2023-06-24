import { useEffect, useState } from "react";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export enum Stores {
  ModifiedFile = "modifiedFiles",
}

export function useIndexedDB() {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  const initDB = () => {
    // open the connection
    request = indexedDB.open("myDB");

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.ModifiedFile)) {
        console.log("Creating object store");
        db.createObjectStore(Stores.ModifiedFile, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      version = db.version;
      console.log("request.onsuccess - initDB", version);
      setIsDBReady(true);
    };
  };

  useEffect(() => {
    initDB();
    console.log("DB ready: ", isDBReady);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDBReady]);

  return { isDBReady };
}
