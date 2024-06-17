// components/ImageUpload.js

import { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "https://p16bkeode0.execute-api.eu-central-1.amazonaws.com/default/coreApp?name=dept",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Image uploaded successfully");
      console.log("Image uploaded:", response.data);
    } catch (error) {
      setMessage("Error uploading image");
      console.error("Error uploading image:", error);
    }
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
