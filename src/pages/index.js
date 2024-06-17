// components/ImageUpload.js

import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the image upload logic, e.g., sending it to a server
    console.log("Image uploaded:", image);
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Image Preview"
            style={{ width: "200px", height: "auto" }}
          />
        )}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
