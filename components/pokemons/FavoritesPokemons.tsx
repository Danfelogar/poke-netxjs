import { FC } from "react";
import { Card, Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";

interface Props {
    pokemons: number[]
}

export const FavoritesPokemons:FC<Props>= ({pokemons}) => {

    return (
        <Grid.Container>
            {
                pokemons.map((id: number) => (
                    <FavoriteCardPokemon pokemonId={ id } key={id}/>
                ))
            }
        </Grid.Container>
    )
}
