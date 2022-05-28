import { FC } from "react"
import Head from "next/head"
import { Navbar } from "../ui"

interface Props {
    children: JSX.Element,
    title?: string,
    author?: string,
}

export const Layout: FC<Props>= ({ children, title }) => {

    const origin = (typeof window === 'undefined') ? '' : window.location.origin;

    return (
        <>
            <Head>
                <title>{ title || "Pokemon App" }</title>
                <meta name="author" content="Danfelogar" />
                <meta name="description" content={`Informacion sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pokémon, pokedex`} />

                <meta property="og:title" content={`Info by ${title}`} />
                <meta property="og:description" content={`This is the page about ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
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