import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const connectDb = await openDB("jate", 1);

  const transact = connectDb.transaction("jate", "readwrite");

  const store = transact.objectStore("jate");

  const req = store.put({ id: 1, value: content });

  const res = await req;
  console.log("Data saved to db", res);
};

export const getDb = async () => {
  const connectDb = await openDB("jate", 1);

  const transact = connectDb.transaction("jate", "readonly");

  const store = transact.objectStore("jate");

  const req = store.getAll();

  const res = await req;
  console.log("result.value", res);
  return res?.value;
};
initdb();
