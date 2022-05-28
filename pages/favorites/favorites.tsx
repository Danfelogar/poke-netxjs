import { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts"
import { NextPage } from 'next';
import { NotFoundFavorites } from "../../components/ui";
import { localFavorites } from '../../utils';
import { FavoritesPokemons } from '../../components/pokemons';

const FavoritesPages: NextPage = () => {

    const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

    useEffect(() => {

        setFavoritesPokemons( localFavorites.pokemons() );

    }, []);

    return (
        <Layout title="list of Favorites">

            {
                favoritesPokemons.length === 0
                ? (<NotFoundFavorites />)
                : (
                    <FavoritesPokemons pokemons={favoritesPokemons} />
                )
            }

        </Layout>
    )
}

export default FavoritesPages;
