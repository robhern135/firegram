import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

//create a hook: small chunk of reusable code

const useStorage = (file) => {
  //progress of upload
  const [progress, setProgress] = useState(0);
  //any errors from upload
  const [error, setError] = useState(null);
  //image url we get back from storage after image fully uploaded
  const [url, setUrl] = useState(null);

  //this needs to run every time we get a new file value (every time the user upload a new image)

  //function runs every time the dependency changes
  useEffect(
    () => {
      //** references **
      const storageRef = projectStorage.ref(file.name);

      //reference a collection in firebase
      const collectionRef = projectFirestore.collection("images");

      //.put() takes the file and puts it in the storage
      //.on() is a listener that fires functions when certain events happen
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          //upload progress bar - set percentage to uploaded percent / total site * 100 for %
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;

          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          //waits for it to complete and then gets the url
          const url = await storageRef.getDownloadURL();
          //add parameters for files
          const createdAt = timestamp();
          //url:url can just be written as url, left here to illustrate
          collectionRef.add({ url: url, createdAt: createdAt });
          //then set it in the state
          setUrl(url);
        }
      );
    },
    //dependency
    [file]
  );

  //return all variables made above
  return { progress, url, error };
};

export default useStorage;
