import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import axios from "axios"

function PokemonList({ name, url }) {
  const router = useRouter()
  const [detail, setDetail] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(url).then(({ data }) => {
      setLoading(false)
      setDetail(data)
    })
  }, [])

  const handleClick = () => {
    // console.log(name)
    router.push("/detail", name)
  }

  return (
    <>
      <div className="col-md-4">
        <Link
          href={`/pokemon/${name}`}
          className="card mb-3 border-0 bg-warning text-decoration-none"
        >
          <div className="row g-0">
            <div className="col-md">
              {loading ? (
                <img
                  src="https://placehold.co/400/ffc107/adb5bd?text=..."
                  className="img-fluid rounded-start"
                  alt="poke-image"
                />
              ) : (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail?.id}.png`}
                  className="img-fluid rounded-start"
                  alt="poke-image"
                />
              )}
            </div>
            <div className="col-md">
              <div className="card-body d-flex flex-column justify-content-center h-100">
                <h5 className="card-title placeholder-glow">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </h5>
                <p className="card-text">
                  {loading && <span class="placeholder col-6"></span>}
                  {detail?.types?.map((data) => {
                    return (
                      <>
                        <small className="text-body-secondary">
                          {data?.type?.name?.charAt(0).toUpperCase() +
                            data?.type?.name?.slice(1)}
                          <br />
                        </small>
                      </>
                    )
                  })}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default PokemonList
