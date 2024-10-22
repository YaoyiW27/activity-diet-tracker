import {  addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";
  
// Function to add a new document to a specified collection in Firestore
export async function writeToDB(collectionName, data) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the generated document ID
  } catch (err) {
    console.error("Error adding document: ", err);
    throw err;
  }
}
  
// Function to delete a document from a specified collection in Firestore
export async function deleteFromDB(collectionName, docId) {
  try {
    await deleteDoc(doc(database, collectionName, docId));
    console.log("Document successfully deleted!");
  } catch (err) {
    console.error("Error deleting document: ", err);
    throw err;
  }
}
  
// Function to read all documents from a specified collection in Firestore
export async function readFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id, // Store the document ID
      ...doc.data(), // Spread the rest of the document data
    }));
    return data;
  } catch (err) {
    console.error("Error reading documents: ", err);
    throw err;
  }
}
  
// Function to update a specific document in Firestore
export async function updateInDB(collectionName, docId, data) {
  try {
    const docRef = doc(database, collectionName, docId);
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch (err) {
    console.error("Error updating document: ", err);
    throw err;
  }
}