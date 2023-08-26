import "bootstrap/dist/css/bootstrap.min.css"

import Head from "next/head"
import { useEffect } from "react"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return (
    <>
      <Head>
        <title>Pokedex Web</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
