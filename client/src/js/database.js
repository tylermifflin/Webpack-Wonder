// create a database called jate
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// export a function to update the database
export const putDb = async (content) => {  
  console.log('Putting content into database');
// create a connection to the database
  const db = await openDB('jate', 1);
//create a transaction to update the database
  const tx = db.transaction('jate', 'readwrite');
// create a store to update the database
  const store = tx.objectStore('jate');
// update the content to the database
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('content added to database' + result);
};

// export a function to get the content from the database
export const getDb = async () => {
  // create a connection to the database
  const db = await openDB('jate', 1);
  // create a transaction to get the content from the database
  const tx = db.transaction('jate', 'readonly');
  // create a store to get the content from the database
  const store = tx.objectStore('jate');
  // get the content from the database
  const request = store.getAll(1);
  const result = await request;
  console.log('content retrieved from database' + result);
  return result?.value;
};


initdb();
