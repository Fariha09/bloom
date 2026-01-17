import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await API.get("/boards");
        setBoards(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoards();
  }, []);

  return (
    <div className="home-container">
      <h1>Bloom Boards</h1>
      <div className="boards-grid">
        {boards.map((board) => (
          <Link to={`/boards/${board._id}`} key={board._id} className="board-card">
            <h3>{board.title}</h3>
            <p>Pins: {board.pins.length}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
