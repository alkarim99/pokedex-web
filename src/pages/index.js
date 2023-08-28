import { useEffect, useState } from "react"
import axios from "axios"

import Loading from "../../components/Loading"
import PokemonList from "../../components/PokemonList"
import Pagination from "../../components/Pagination"

export default function Home() {
  const [pokemon, setPokemon] = useState([])
  const [typeList, setTypeList] = useState([])
  const [currentType, setCurrentType] = useState("")
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
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data: { results } }) => {
        setLoading(false)
        setTypeList(results)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://pokeapi.co/api/v2/type/${currentType}`)
      .then(({ data: { pokemon } }) => {
        setLoading(false)
        setPokemon(pokemon)
      })
  }, [currentType])

  useEffect(() => {
    setLoading(true)
    if (currentPageUrl != "") {
      axios
        .get(currentPageUrl)
        .then(({ data: { next, previous, results } }) => {
          setLoading(false)
          setNextPageUrl(next)
          setPrevPageUrl(previous)
          setPokemon(results)
        })
    }
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
        <div className="row justify-content-end">
          <div className="col-md-3">
            <label for="inputState" className="form-label">
              Sort by type
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(e) => {
                setCurrentPageUrl("")
                setCurrentType(e.target.value.toLowerCase())
              }}
            >
              <option>Select type...</option>
              {typeList?.map((type) => {
                return (
                  <>
                    <option>
                      {type?.name?.charAt(0).toUpperCase() +
                        type?.name.slice(1)}
                    </option>
                  </>
                )
              })}
            </select>
          </div>
        </div>
        {currentType && (
          <div
            className="alert alert-warning alert-dismissible fade show mt-3"
            role="alert"
          >
            List of Pokemon Sort by Type <strong>{currentType}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon?limit=9")
                setCurrentType("")
              }}
            ></button>
          </div>
        )}
        <div className="row row-cols-2 row-cols-md-2 g-2 justify-content-center pt-3">
          {currentType != ""
            ? pokemon?.map((poke, index) => {
                return (
                  <PokemonList
                    name={poke?.pokemon?.name}
                    url={poke?.pokemon?.url}
                    key={index}
                  />
                )
              })
            : pokemon?.map((poke, index) => {
                return (
                  <PokemonList name={poke?.name} url={poke?.url} key={index} />
                )
              })}
          {/* {pokemon?.map((poke, index) => {
            if (currentType != "") {
              return (
                <PokemonList
                  name={poke?.pokemon?.name}
                  url={poke?.pokemon?.url}
                  key={index}
                />
              )
            } else {
              return (
                
              )
            }
          })} */}
        </div>
        {!currentType && (
          <Pagination
            prevPageUrl={prevPageUrl}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </>
  )
}
