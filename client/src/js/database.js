import { openDB } from 'idb';

const initdb = async () =>
	openDB('jate', 2, {
		upgrade(db) {
			if (db.objectStoreNames.contains('jate_text')) {
				console.log('jate_text already exists');
				return;
			}
			db.createObjectStore('jate_text', {
				keyPath: 'id',
				autoIncrement: true
			});
			console.log('jate_text created');
		}
	});

initdb();

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async content => {
    console.log('post');

    const db = await openDB('jate', 2);
    const tx = db.transaction('jate_text', 'readwrite');

    const store = tx.objectStore('jate_text');

    const request = store.add({content: content});
    const result = await request;
    return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('get');

	const db = await openDB('jate', 2);
	const tx = db.transaction('jate_text', 'readonly');

	const store = tx.objectStore('jate_text');

	const request = store.getAll();
	const result = await request;
	return result;
};
// export const getDb = async () => {
//     console.log('getDb');

//     const db = await openDB('jate', 1);
//     const tx = db.transaction('jate_text', 'readonly');

//     const store = tx.objectStore('jate_text');

//     const request = store.getAll();
//     const result = await request;
//     return result;
// };
