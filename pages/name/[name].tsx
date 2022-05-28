import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import pokeApi from '../../api/pokeApi';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { Layout } from '../../components/layouts/Layout';
import { Grid, Card, Image, Container, Text, Button } from '@nextui-org/react';
import { useState } from 'react';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.exitsInFavorites(pokemon.id));
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if( !isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            },
        })
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` || '/no-image.png' }
                                alt={ pokemon.name }
                                width='100%'
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color='gradient'
                                ghost={ !isInFavorites }
                                onClick={onToggleFavorite}
                            >
                                { isInFavorites ? 'In Favorites' : 'Save to Favorites' }
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex' gap={ 0 }>
                                <Image
                                    src={ pokemon.sprites.front_default || '/no-image.png' }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.back_default || '/no-image.png' }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.front_shiny || '/no-image.png' }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.back_shiny || '/no-image.png' }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data }= await pokeApi.get<PokemonListResponse>('/pokemon?limit=493');

    return {
        paths: data.results.map(pokemon => ({
            params: { name: pokemon.name }
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };

    return {
        props: {pokemon: await getPokemonInfo(name) },
    }
}

export default PokemonByNamePage
