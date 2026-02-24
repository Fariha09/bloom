import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function BoardsList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/boards")
      .then((res) => res.json())
      .then((data) => setBoards(data))
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">All Boards 🌿</h2>

      <div className="boards">
        {boards.length === 0 ? (
          <p>No boards yet 🌱</p>
        ) : (
          boards.map((board) => (
            <Link
              to={`/boards/${board._id}`}
              key={board._id}
              className="board"
            >
              {board.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default BoardsList;
