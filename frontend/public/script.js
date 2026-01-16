// =======================
// MOCK DATA
// =======================
let boards = [
    {
        id: 1,
        title: "Nature Inspiration",
        description: "A collection of serene landscapes and green vibes.",
        imageUrl: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        title: "Quotes & Motivation",
        description: "Uplifting quotes to keep you inspired.",
        imageUrl: "https://via.placeholder.com/300x200"
    },
    {
        id: 3,
        title: "Room Decor Ideas",
        description: "Cozy and creative interior design inspiration.",
        imageUrl: "https://via.placeholder.com/300x200"
    }
];

// =======================
// DOM ELEMENTS
// =======================
const boardGrid = document.getElementById("board-grid");

// =======================
// FUNCTIONS
// =======================

// Render all boards dynamically
function renderBoards() {
    boardGrid.innerHTML = ""; // Clear existing
    boards.forEach(board => {
        const boardHTML = `
        <div class="col-md-4 mb-4">
            <div class="card" style="background-color: #F5F0E6;">
                <img src="${board.imageUrl}" class="card-img-top" alt="${board.title}">
                <div class="card-body">
                    <h5 class="card-title" style="color: #2E6F40;">${board.title}</h5>
                    <p class="card-text" style="color: #1F3D2B;">${board.description}</p>
                </div>
            </div>
        </div>
        `;
        boardGrid.insertAdjacentHTML("beforeend", boardHTML);
    });
}

// Add a new board (mock)
function addBoard(title, description, imageUrl) {
    const newBoard = {
        id: boards.length + 1,
        title: title,
        description: description,
        imageUrl: imageUrl || "https://via.placeholder.com/300x200"
    };
    boards.push(newBoard);
    renderBoards();
}

// =======================
// EVENT LISTENERS
// =======================

// Example: Add a board on button click
const getStartedBtn = document.querySelector("header .btn");
getStartedBtn.addEventListener("click", () => {
    const title = prompt("Enter board title:");
    if (!title) return alert("Board title is required!");
    const description = prompt("Enter board description:");
    addBoard(title, description);
});

// =======================
// INITIAL RENDER
// =======================
renderBoards();
