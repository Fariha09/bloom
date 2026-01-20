import React, { useState } from "react";

function CreateBoard() {
  const [title, setTitle] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    if (imageUrls) {
      formData.append("imageUrls", JSON.stringify(imageUrls.split(",")));
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/boards", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Board created!");
        setTitle("");
        setImageUrls("");
        setFiles([]);
      } else {
        const data = await res.json();
        alert(data.error || "Error creating board");
      }
    } catch (err) {
      console.error(err);
      alert("Board creation failed");
    }
  };

  return (
    <div className="auth-container">
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
          type="text"
          placeholder="Image URLs (comma separated)"
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
}

export default CreateBoard;
