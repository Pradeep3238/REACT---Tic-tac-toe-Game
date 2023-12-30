import { useState } from 'react';
import '../index.css';

export default function Player({initialName,symbol,isActive,onChangeName}){

    //for showing the name who won the game, 
    //we cant lift up the state to app component as there are two players and we cant change state independantly. 
    //so for that...call the state from app

    const [isEditing, setIsEdititng]=useState(false);

    const [playerName,setPlayerName]=useState(initialName);

    const editclickHandler =()=>{
        setIsEdititng(editing=> !editing);
        if(isEditing)
            onChangeName(symbol,playerName);
    }

    const editplayerHandler = (event) =>{
        setPlayerName(event.target.value);
    }

    return (
    <li className={isActive ?'active':undefined}>
        <span className='player'>
            
            {!isEditing && <span className="player-name">{playerName}</span>}
            
            {isEditing && <input type='text' value={playerName} required onChange={editplayerHandler} ></input>}

            <span className="player-symbol">{symbol}</span>

        </span>

        <button onClick={editclickHandler}>{isEditing ? "save" : "edit"}</button>
    </li>
    );
}