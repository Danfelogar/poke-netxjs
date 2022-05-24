import { FC } from "react"
import Head from "next/head"
import { Navbar } from "../ui"

interface Props {
    children: JSX.Element,
    title?: string,
    author?: string,
}

export const Layout: FC<Props>= ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{ title || "Pokemon App" }</title>
                <meta name="author" content="Danfelogar" />
                <meta name="description" content={`Informacion sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pokémon, pokedex`} />
            </Head>
            <Navbar/>
            <main style={{
                padding: "0 20px",
                
            }}>
                {children}
            </main>
        </>
    )
}