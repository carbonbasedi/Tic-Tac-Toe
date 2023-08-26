import { Button, Box } from "@radix-ui/themes";
import { useReducer } from "react";
import { BsXLg, BsCircle } from "react-icons/bs";

const emptyCell = undefined;
const x = <BsXLg />;
const o = <BsCircle />;

const winCombos = [
  [0, 1, 2],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellIsTaken = (board, index) => board[index] !== emptyCell;
const boardIsFull = (board) => board.every((cell) => cell !== emptyCell);

const getWinCombo = (board, player) => {
  for (const combo of winCombos) {
    if (combo.every((index) => board[index] === player)) return combo;
  }
  return null;
};

const checkBoard = (board, player) => {
  const winCombo = getWinCombo(board, player);

  if (winCombo)
    return { message: `${player === x ? "X" : "O"} wins!`, combo: winCombo };
  if (boardIsFull(board)) return { message: "draw" };
  return { message: "playing" };
};

function playTurn(state, action) {
  if (state.status.message !== "playing") return state;
  if (cellIsTaken(state.board, action.index)) return state;

  const board = state.board.map((cell, index) =>
    index === action.index ? state.player : cell
  );
  const player = state.player === x ? o : x;
  const status = checkBoard(board, state.player);
  return {
    ...state,
    board,
    player,
    status,
  };
}

const initialState = {
  board: Array(9).fill(emptyCell),
  player: x,
  status: { message: "playing" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PLAY_TURN":
      return playTurn(state, action);
    case "RESTART_GAME":
      return initialState;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="font-sans text-center grid place-items-center h-screen">
      <Box className="">
        <h1 className="uppercase">{state.status.message}</h1>
        {state.status.message === "playing" && (
          <h2 className="flex items-center justify-center">
            Turn :{state.player}{" "}
          </h2>
        )}
      </Box>
      <div className="">
        <div className="border border-black overflow-hidden rounded-lg w-[300px] h-[300px] grid grid-cols-3 grid-rows-3">
          {state.board.map((cell, index) => (
            <div
              onClick={() => dispatch({ type: "PLAY_TURN", index })}
              key={`cell-${index}`}
              className={`text-5xl border border-black grid place-items-center ${
                state.status.combo?.includes(index) ? "text-blue-500" : ""
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        {state.status.message !== "playing" && (
          <Button
            color="indigo"
            variant="soft"
            onClick={() => dispatch({ type: "RESTART_GAME" })}
          >
            RESTART
          </Button>
        )}
      </div>
    </div>
  );
}
export default App;