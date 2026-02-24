import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/boards/${id}`)
      .then((res) => res.json())
      .then(setBoard)
      .catch(console.error);
  }, [id]);

  // 🔼 Upload from computer
  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);

    const res = await fetch(
      `http://localhost:5000/api/boards/${id}/images/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const updatedBoard = await res.json();
    setBoard(updatedBoard);
    setFile(null);
  };

  // 🌐 Add image via URL
  const addImageUrl = async (e) => {
    e.preventDefault();
    if (!imageUrl) return;

    const res = await fetch(
      `http://localhost:5000/api/boards/${id}/images`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      }
    );

    const updatedBoard = await res.json();
    setBoard(updatedBoard);
    setImageUrl("");
  };

  if (!board) return <p>Loading board 🌱</p>;

  return (
    <div className="board-page">
      <h2>{board.title}</h2>

      {/* Upload options */}
      <div className="add-image-form">
        <form onSubmit={uploadImage}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Upload Image</button>
        </form>

        <form onSubmit={addImageUrl}>
          <input
            type="text"
            placeholder="Paste image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit">Add via URL</button>
        </form>
      </div>

      {/* Pinterest-style grid */}
      <div className="image-grid">
  {board.images && board.images.length > 0 ? (
    board.images.map((img, i) => (
      <div key={i} className="image-card">
        <img src={img.imageUrl} alt="" />
      </div>
    ))
  ) : (
    <p>No images yet 🌿</p>
  )}
</div>
    </div>
  );
}

export default BoardPage;
