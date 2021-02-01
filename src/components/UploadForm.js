import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  //set state to store file and set the file
  const [file, setFile] = useState(null);
  //set state to store error and set the error
  const [error, setError] = useState(null);

  //array of allowed filetypes
  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    //if the file has been uplaoded, and its one of the allowed types
    if (selected && types.includes(selected.type)) {
      //use setFile method and pass in selected file
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <form>
      <input type="file" onChange={changeHandler} />
      <div className="output">
        {/* check for error and if error exists, output error message */}
        {error && <div className="error">{error}</div>}
        {/* check for file and output confirmation message */}
        {file && <div className="image">{file.name}</div>}
        {/* if file exists output the progress bar */}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};
export default UploadForm;
