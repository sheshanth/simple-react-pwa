import React from 'react';

import './toast.scss'

function ToastComponent() {

  const handleclick = () => {
    console.log(`clicked`)
  }

  return (
    <div className="ToastComponent">
      <div className="message">message</div>
      <div type="button" className="close" aria-label="Close" onClick={handleclick}>
        <span aria-hidden="true">&times;</span>
      </div>
    </div>
  )
}

export default ToastComponent;
