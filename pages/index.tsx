import { NextPage, GetStaticProps } from 'next';
import { Layout } from '../components/layouts';

const HomePage: NextPage = (props) => {
  console.log({props});
  return (
    <Layout title={"Pokedex App"}>
      <ul>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
      </ul>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
//en produccion solo se ejecuta una unica vez en el build time en desarrollo se ejecuta cada vez que actualizo
export const getStaticProps: GetStaticProps = async (ctx) => {

  console.log("hola mundo")

  return {
    props: {
      name: 'Daniel'
    }
  }
}

export default HomePage
