import React from 'react'
import './Spinner.scss'

function Spinner() {
  return <div className="spinner-border text-dark Spinner" role="status">
  <span className="sr-only">Loading...</span>
</div>
}

export default Spinner