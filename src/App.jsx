import { useState, useEffect } from "react"
import { solutions } from "./solution"
import GridTile from "./components/GridTile";

function App() {
  const [boxs, setBoxs] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleBox = () => {
    const shuffledBox = [...solutions, ...solutions]
      .sort(() => Math.random() - 0.5 )
      .map(solution => ( {...solution, id: Math.random()} ));

    setChoiceOne(null);
    setChoiceTwo(null);
    setBoxs(shuffledBox);
  }

  const hendleChoice = (box) => {
    choiceOne ? setChoiceTwo(box) : setChoiceOne(box) ;
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.color === choiceTwo.color){
        setBoxs(prevData => ( 
          prevData.map(box => {
            if(box.color === choiceOne.color){
              return {...box, matched: true}
            } else {
              return box;
            }
          })
        ));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }

    }
  }, [choiceOne, choiceTwo]);

  console.log(choiceOne)
  console.log(choiceTwo)

  // console.log(choiceOne, choiceTwo)

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(prev => prev + 1);

  }

  return (
    <div className="container mx-auto w-1/2 text-center ">
      <h1 className="text-2xl p-4 font-bold">Memory Game</h1>
      <button 
        className="border border-2 p-2 rounded border-black"
        onClick={shuffleBox}
        >Start Game</button>
      <div className="grid grid-cols-4 gap-4 my-4">
        {boxs.map(box => (
          <GridTile 
            key={box.id}
            box={box}
            hendleChoice={hendleChoice}
            flipped={box === choiceOne || box === choiceTwo || box.matched}
          />
        ))}
      </div>
    </div>
  )
}

export default App
