// FirestoreHelper.js
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

// Add a new document to Firestore
export async function writeToDB(item, collectionName) {
  try {
    await addDoc(collection(database, collectionName), item);
    console.log("Document successfully added");
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

// Delete a document from Firestore
export async function deleteFromDB(id, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, id));
    console.log("Document successfully deleted");
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
}

// Update an existing document in Firestore
export async function updateDB(id, collectionName, newItem) {
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, newItem);
    console.log("Document successfully updated");
  } catch (err) {
    console.error("Error updating document: ", err);
  }
}