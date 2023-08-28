import React from "react"
import Link from "next/link"
import axios from "axios"

function Detail({ data }) {
  return (
    <>
      <div className="container my-5">
        <Link href="/" class="btn btn-primary btn-sm">
          Back
        </Link>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
              className="img-fluid rounded-start"
              alt="poke-image"
            />
          </div>
        </div>
        <h1 className="text-center">
          {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}
        </h1>
        <br />
        Height : {(data?.height * 0.1).toString()} m
        <br />
        Weight : {(data?.weight * 0.1).toString()} Kg
        <br />
        Types :
        <ul>
          {data?.types.map((type) => {
            return (
              <>
                <li>{type?.type?.name}</li>
              </>
            )
          })}
        </ul>
        Abilities :
        <ul>
          {data?.abilities.map((ability) => {
            return (
              <>
                <li>{ability?.ability?.name}</li>
              </>
            )
          })}
        </ul>
        Stats :
        <ul>
          {data?.stats.map((stat) => {
            return (
              <>
                <li>
                  {stat?.stat?.name} = {stat?.base_stat}
                </li>
              </>
            )
          })}
        </ul>
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
