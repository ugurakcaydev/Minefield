import classnames from "classnames";
import { useState, useEffect } from "react";

const customArray = Array.from({ length: 5 }, () =>
  Array.from({ length: 3 }, () => null)
);

function App() {
  const [array, setArray] = useState(customArray);
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleClick = (rowIndex, colIndex) => {
    if (rowIndex === currentRow) {
      const newBoard = array.map((row, rIndex) =>
        row.map((tile, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            if (tile === false) {
              setIsGameEnd(true);
              return "X";
            }
            return "✓";
          } else {
            return tile;
          }
        })
      );
      setArray(newBoard);
      setCurrentRow(currentRow + 1);
      const isWon = newBoard.every((row) => row.every((tile) => tile !== true));
      if (isWon) {
        setIsGameWon(true);
      }
    }
  };

  useEffect(() => {
    const newArray = array.map((row) => {
      let indices = [0, 1, 2];
      let falseIndices = [];
      for (let i = 0; i < 2; i++) {
        let randomIndex = Math.floor(Math.random() * indices.length);
        falseIndices.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
      }
      return row.map((tile, index) =>
        falseIndices.includes(index) ? false : true
      );
    });
    setArray(newArray);
  }, []);

  const restartGame = () => {
    const newArray = customArray.map((row) => {
      let indices = [0, 1, 2];
      let falseIndices = [];
      for (let i = 0; i < 2; i++) {
        let randomIndex = Math.floor(Math.random() * indices.length);
        falseIndices.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
      }
      return row.map((tile, index) =>
        falseIndices.includes(index) ? false : true
      );
    });
    setArray(newArray);
    setCurrentRow(0);
    setIsGameEnd(false);
    setIsGameWon(false);
  };

  return (
    <div className="w-full h-[100vh] bg-slate-800 flex flex-col items-center justify-center ">
      <div className="w-[260px] flex flex-col ">
        <div className="grid grid-cols-3 p-6 bg-gray-400 gap-4  rounded-md">
          {array.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                className={classnames(
                  "flex items-center justify-center w-16 h-16 bg-slate-500 text-white rounded-md  hover:scale-95 shadow-lg border-4 ",
                  {
                    "border-green-500":
                      tile === "✓" || (isGameEnd == true && tile === true),
                    "!bg-orange-500": rowIndex == currentRow && !isGameEnd,
                    "border-red-500 ": tile === "X",
                    "pointer-events-none": isGameEnd == true,
                  }
                )}
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  handleClick(rowIndex, colIndex);
                }}
              >
                {/* {tile === true ? "T" : tile === false ? "F" : ""} */}
                {tile}
              </div>
            ))
          )}
        </div>
        <div
          className={classnames(
            "w-full h-12 flex items-center justify-between invisible text-white text-lg font-mono",
            {
              "!visible": isGameEnd || isGameWon,
            }
          )}
        >
          {isGameEnd && <div>You Lose :(</div>}
          {isGameWon && <div>You Win :)</div>}
          {(isGameEnd || isGameWon) && (
            <button
              className="border border-green-500 px-2 py-1 rounded-md bg-green-500 text-white shadow-xl"
              onClick={restartGame}
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
