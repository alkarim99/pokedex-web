import React from "react"

function Pagination({ prevPageUrl, handlePreviousPage, handleNextPage }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {prevPageUrl && (
          <li className="page-item">
            <button className="page-link" onClick={handlePreviousPage}>
              Previous
            </button>
          </li>
        )}
        <li className="page-item">
          <button className="page-link" onClick={handleNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
