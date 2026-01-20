import React, { useEffect, useState } from "react";
import "../App.css";

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/boards")
      .then((res) => res.json())
      .then((data) => setBoards(data));
  }, []);

  return (
    <div className="boards">
      {boards.map((board) => (
        <div key={board._id} className="board">
          <h3>{board.title}</h3>

          <div className="image-grid">
            {board.images.map((img, i) => (
              <img key={i} src={img.imageUrl} alt="" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Boards;
