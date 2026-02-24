import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBoard() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    // Upload local images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // Add URL images
    if (imageUrls.trim()) {
      const urlsArray = imageUrls.split(",").map(url => url.trim());
      formData.append("imageUrls", JSON.stringify(urlsArray));
    }

    try {
      const res = await fetch("http://localhost:5000/api/boards", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-board">
      <h2>Create Board 🌸</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <textarea
          placeholder="Paste image URLs separated by commas"
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBoard;