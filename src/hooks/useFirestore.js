import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      //order by created as descending before making changes
      .orderBy("createdAt", "desc")
      //snap is snapshot at that time of the database, fires initially and whenever collection (dependency) changes
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          //get all data from database and spread into adding new one
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    //unsubscribe from the collection when we no longer use it
    return () => unsub();
  }, [collection]);

  return { docs };
};
export default useFirestore;
