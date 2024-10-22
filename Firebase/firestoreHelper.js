// firestoreHelper.js
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { database } from './firebaseSetup'; // Ensure the path is correct

// Function to add a new document to a specified collection
export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(`Document added to ${collectionName} with ID: ${docRef.id}`);
    return docRef.id; // Return the ID of the newly added document
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

// Function to update a document in a specified collection
export async function updateDocument(collectionName, id, data) {
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, data);
    console.log(`Document ${id} updated in ${collectionName}`);
  } catch (error) {
    console.error(`Error updating document ${id} in ${collectionName}:`, error);
    throw error;
  }
}

// Function to delete a document from a specified collection
export async function deleteDocument(collectionName, id) {
  try {
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);
    console.log(`Document ${id} deleted from ${collectionName}`);
  } catch (error) {
    console.error(`Error deleting document ${id} from ${collectionName}:`, error);
    throw error;
  }
}

// Function to listen for real-time updates on a specified collection
export function onCollectionSnapshot(collectionName, callback, errorCallback) {
  const collectionRef = collection(database, collectionName);
  return onSnapshot(collectionRef, callback, errorCallback);
}