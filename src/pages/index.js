import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon`)
      .then(({ data: { next, previous, results } }) => {
        setPokemon(results)
      })
  }, [])
  return (
    <>
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {pokemon.map(({ name }) => {
            return (
              <>
                <div className="col">
                  <div className="card mb-3" style={{ maxWidth: 540 + "px" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src="https://placehold.co/600x500"
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">{name}</p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              Last updated 3 mins ago
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
