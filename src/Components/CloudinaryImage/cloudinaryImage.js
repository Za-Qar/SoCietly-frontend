import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";

export default function CloudinaryImage() {
  const [images, setImages] = useState("");

  async function getImages() {
    let res = await fetch("http://localhost:3000/users/imageupload");
    let data = await res.json();
    setImages(data);
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <div>
        {images &&
          images.map((image, index) => {
            <Image
              key={index}
              cloudName="falcons"
              publicId={image}
              width="300"
              crop="scale"
            />;
          })}
      </div>
    </div>
  );
}
