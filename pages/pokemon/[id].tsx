import { useState } from 'react';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import { redirect } from 'next/dist/server/api-utils';
interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    // console.log({pokemon});
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemon493 = [...Array(493)].map((pokemon, idx) => `${idx + 1}`);

    return {
        paths: pokemon493.map(id => ({
            params: { id }
        })),
        fallback: 'blocking',
        // significa que si la pag no esta permitida dame un error 404 en caso tal quiera que pase todo pues le pongo la variable "blocking"

    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    const pokemon = await getPokemonInfo(id);

    if(!pokemon) {
        return{
            redirect: {
                destination: '/',
                permanent: false,
                //si en un futuro existe la pag se puede redirigir en caso tal sea true va a quedar bloqueada para siempre
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400,
        //in seconds
    }
}

export default PokemonPage