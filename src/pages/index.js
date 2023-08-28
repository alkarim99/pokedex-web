import { useEffect, useState } from "react"
import axios from "axios"

import Loading from "../../components/Loading"
import PokemonList from "../../components/PokemonList"
import Pagination from "../../components/Pagination"

export default function Home() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  )
  const [nextPageUrl, setNextPageUrl] = useState("")
  const [prevPageUrl, setPrevPageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  const handleNextPage = () => {
    setCurrentPageUrl(nextPageUrl)
  }

  const handlePreviousPage = () => {
    setCurrentPageUrl(prevPageUrl)
  }

  useEffect(() => {
    setLoading(true)
    axios.get(currentPageUrl).then(({ data: { next, previous, results } }) => {
      setLoading(false)
      setNextPageUrl(next)
      setPrevPageUrl(previous)
      setPokemon(results)
    })
  }, [currentPageUrl])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <img src="logo.png" className="img-fluid" />
          </div>
        </div>
        <h1 className="text-center">Pokédex</h1>
        <p className="text-center">
          Powered by{" "}
          <a href="https://pokeapi.co/" target="_blank">
            PokeAPI
          </a>
          <br />
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/abdullah-alkarim-amrullah/"
            target="_blank"
          >
            Abdullah Al-Karim Amrullah
          </a>
        </p>
        <div className="input-group mb-3 py-4">
          <input
            type="text"
            className="form-control py-3"
            placeholder="Search your favorite poke"
            aria-label="Search"
            aria-describedby="button-addon2"
            // onChange={(e) => {
            //   setKeyword(e.target.value.toLowerCase())
            // }}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     handleSearch()
            //   }
            // }}
          />
          <button
            className="btn btn-primary px-5"
            type="submit"
            id="button-addon2"
            // onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="row row-cols-2 row-cols-md-2 g-2 justify-content-center">
          {pokemon.map((poke, index) => {
            return <PokemonList name={poke?.name} url={poke?.url} key={index} />
          })}
        </div>
        <Pagination
          prevPageUrl={prevPageUrl}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </>
  )
}
