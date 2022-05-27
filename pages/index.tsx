import { NextPage, GetStaticProps } from 'next';
import { Layout } from '../components/layouts';
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPoke } from '../interfaces';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemons';

interface Props {
  pokemons: SmallPoke[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log({pokemons});
  return (
    <Layout title={"Pokedex App"}>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
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

  const { data }= await pokeApi.get<PokemonListResponse>('/pokemon?limit=493');
  //console.log({ data });
  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/
  let pokemons: SmallPoke[] = new Array();
  data.results.map((pokemon: SmallPoke, idx: number) => {
    pokemons.push({
      ...pokemon,
      id: idx + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idx + 1}.png`,
    })
  })
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
