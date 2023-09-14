import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react'
import emptyAnim from "../../animation/empty.json"

function EmptyTodoList(props) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
        <Player
          autoplay
          loop
          src={emptyAnim}
          style={{ width: '240px' }}
        >
        </Player>
        <div>Press + button to create new todo</div>
      </div>
    );
  }

export default EmptyTodoList