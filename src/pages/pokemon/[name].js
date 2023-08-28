import React from "react"
import Link from "next/link"
import axios from "axios"

function Detail({ data }) {
  return (
    <>
      <div className="container my-5">
        <div className="mt-3 row flex-column-reverse flex-md-row justify-content-center align-items-center">
          <div className="col-md-3">
            <Link href="/" className="btn btn-primary btn-sm">
              Back
            </Link>
            <p className="mb-1">Height : {(data?.height / 10).toString()} m</p>
            <p className="mb-1">Weight : {(data?.weight / 10).toString()} Kg</p>
            Types :
            <ul className="mb-1">
              {data?.types.map((type) => {
                return (
                  <>
                    <li>{type?.type?.name}</li>
                  </>
                )
              })}
            </ul>
            Abilities :
            <ul className="mb-1">
              {data?.abilities.map((ability) => {
                return (
                  <>
                    <li>{ability?.ability?.name}</li>
                  </>
                )
              })}
            </ul>
            Stats :
            {data?.stats.map((stat) => {
              return (
                <>
                  <div
                    className="progress mb-1"
                    role="progressbar"
                    aria-label="Warning example"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar text-bg-warning"
                      style={{ width: stat?.base_stat + "%" }}
                    >
                      {stat?.stat?.name} = {stat?.base_stat}%
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className="col-md-3">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
              className="img-fluid rounded-start"
              alt="poke-image"
            />
            <h1 className="text-center">
              {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const {
    data: { results },
  } = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1280")
  const paths = results.map((row) => ({
    params: { name: row.name },
  }))
  return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  )
  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export default Detail
