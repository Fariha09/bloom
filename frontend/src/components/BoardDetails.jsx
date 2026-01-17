import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";
import "./BoardDetails.css";

const BoardDetails = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await API.get(`/boards/${id}`);
        setBoard(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoard();
  }, [id]);

  if (!board) return <p>Loading...</p>;

  return (
    <div className="board-details-container">
      <h1>{board.title}</h1>
      <div className="pins-grid">
        {board.pins.map((pin) => (
          <div key={pin._id} className="pin-card">
            <img src={pin.imageUrl} alt={pin.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetails;
