import React from "react"

function Loading() {
  return (
    <div className="row justify-content-center align-items-center vh-100 text-center">
      <div class="spinner-grow text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
