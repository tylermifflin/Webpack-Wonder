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
  console.log('content added to database' + content);
// create a connection to the database
  const db = await openDB('jate', 1);
// update the content to the database
  await db.put('jate', content);
};

// export a function to get the content from the database
export const getDb = async () => {
  console.log('content retrieved from database');
  const db = await openDB('jate', 1);
  const content = await db.getAll('jate');
  return content;
};


initdb();
