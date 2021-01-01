import React, { useState } from "react";
const axios = require("axios");

function ReactUploadImage() {
  const [image, setImage] = useState({ file: null });

  function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", image.file);

    console.log(formData);
    console.log(image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        "http://localhost:3000/users/upload",
        formData,
        config,
        console.log(config)
      )
      .then((response) => {
        alert("The file is successfully uploaded", console.log(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onChange(e) {
    setImage(e.target.files[0].name);
    console.log(
      "e.target.files[0]): ",
      setImage({ file: e.target.files[0].name })
    );
    console.log("image: ", image);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input type="file" name="myImage" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ReactUploadImage;
