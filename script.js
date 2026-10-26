const cells = [...document.querySelectorAll(".cell")];
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function findWinningLine() {
  return winningLines.find(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function playCell(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.setAttribute("aria-label", `Cell ${index + 1}: ${currentPlayer}`);
  cell.disabled = true;

  const winningLine = findWinningLine();

  if (winningLine) {
    gameOver = true;
    winningLine.forEach(index => cells[index].classList.add("winning"));
    cells.forEach(button => button.disabled = true);
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    return;
  }

  if (board.every(Boolean)) {
    gameOver = true;
    statusText.textContent = "It's a Draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("winning");
    cell.setAttribute("aria-label", `Cell ${index + 1}`);
  });

  statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", playCell));
resetButton.addEventListener("click", resetGame);
