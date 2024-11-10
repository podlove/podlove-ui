import { curry, get } from 'lodash-es';

export const open = (
  database: string,
  hooks?: {
    onCreate?: (db: IDBDatabase) => Promise<any>;
  }
): Promise<IDBDatabase> => {
  const request = globalThis.indexedDB.open(database);

  request.onerror = (event) => {
    console.error(`Error ${database}`, get(event, ['target', 'error', 'message']));
  };

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = (event) => {
      // Save the IDBDatabase interface
      const db = get(event, ['target', 'result']);

      if (!db) {
        return reject(new Error(`Failed to upgrade ${db}`));
      }

      // Create an objectStore for this database

      if (hooks?.onCreate) {
        hooks.onCreate(db).then(() => {
          resolve(db);
        });
      }
    };

    request.onsuccess = (event) => {
      const db = get(event, ['target', 'result']);
      resolve(db);
    };
  });
};

export const createStore = curry(
  (
    name: string,
    parameters: IDBObjectStoreParameters,
    indizes: { name: string; keyPath: string | string[]; options?: IDBIndexParameters }[],
    db: IDBDatabase
  ): Promise<IDBObjectStore> => {
    return new Promise((resolve, reject) => {
      const objectStore = db.createObjectStore(name, parameters);

      indizes.forEach((index) => {
        objectStore.createIndex(index.name, index.keyPath, index.options);
      });

      objectStore.transaction.oncomplete = () => resolve(objectStore);
      objectStore.transaction.onerror = () => reject(new Error(`Failed to create store ${name}`));
      objectStore.transaction.onabort = () => reject(new Error(`Failed to create store ${name}`));
    });
  }
);

export const transaction = (storeName: string, db: IDBDatabase) => {
  const find = <T>(indexName: string, needle: string): Promise<null | T> => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.openCursor(IDBKeyRange.only(needle));

    return new Promise((resolve) => {
      request.onsuccess = function () {
        const cursor = request.result;
        if (cursor) {
          return resolve(cursor.value as T);
        }
        return resolve(null);
      };

      request.onerror = function () {
        resolve(null);
      }
    });
  };

  const all = <T>() => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve) => {
      request.onsuccess = function () {
        if (request.result) {
          return resolve(request.result as T);
        }
        return resolve(null);
      };

      request.onerror = function () {
        resolve(null);
      }
    });
  }

  const save = (data: any) =>
    new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = function () {
        resolve(data);
      };
      request.onerror = function () {
        reject(request.error);
      };
    });

  return {
    find,
    save,
    all
  };
};
