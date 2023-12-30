import { useState } from "react";

import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import GameOver from './Components/GameOver'




import {WINNING_COMBINATIONS} from './Components/winningCombination';
import './index.css';

const PLAYERS={
  X:'Player 1',
  O:'Player 2'
}
const INITIAL_BOARD=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

//inlcude helper funtion
function derivedActivePlayer(gameTurn){
  let currentPlayer = 'X';
        if(gameTurn.length>0 && gameTurn[0].player==='X'){
          currentPlayer='O';
        }
      return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner;   
  for( const combination of WINNING_COMBINATIONS){
    const firstsquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondsquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdsquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if(firstsquareSymbol && firstsquareSymbol===secondsquareSymbol && firstsquareSymbol===thirdsquareSymbol){
        winner=players[firstsquareSymbol];
    }
  }
  return winner;

}

function deriveGameBoard(gameTurn){
  let gameBoard=[...INITIAL_BOARD.map(array=>[...array])];
  for(const turn of gameTurn){
        const {square,player}=turn;
        const{row,col}=square;

        gameBoard[row][col]=player;
  }
  return gameBoard;
}

function App() {

  const [gameTurn, setGameTurn]=useState([]);
  // const[hasWinner,setHasWinner]=useState(false); still redundant as we have the info in gameturns state and check there with helper function
  // const [activePlayer,setActivePlayer]=useState('X');
  const activePlayer = derivedActivePlayer(gameTurn); 
  // remove redundant state as we have the current player info in gameturn state,
  //  we dont need a seperate state just to update the UI 

  const[players,setPlayers]=useState(PLAYERS);

  const gameBoard=deriveGameBoard(gameTurn);
  const winner=deriveWinner(gameBoard,players);
  const hasDraw= gameTurn.length===9 && !winner;


  function handleRestart(){
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayer=>{
      return {
        ...prevPlayer,
        [symbol]:newName
      };
    });
  }

  function handleSelectSquare (rowIndex,colIndex) { 
    // setActivePlayer(curActivePlayer => (curActivePlayer === 'X' ? 'O' : 'X') );
    setGameTurn((prevTurn)=>{
    //   let currentPlayer = 'X';
    //   if(prevTurn.length>0 && prevTurn[0].player==='X'){
    //     currentPlayer='O';
    //   }
    // return currentPlayer;

        const currentPlayer=derivedActivePlayer(prevTurn);//implment the above logic by calling the helper function

        const updatedTurn=[
          {square:{row:rowIndex,col:colIndex} , player:currentPlayer },
          ...prevTurn,
        ];
        return updatedTurn;
    })
  } 
  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer==='X'}
            onChangeName={handlePlayerNameChange}/>
          <Player 
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer==='O'}
            onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </>
    )
}

export default App;
