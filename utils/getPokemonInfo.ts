import pokeApi from '../api/pokeApi';
import { Pokemon } from '../interfaces';

export const getPokemonInfo = async( nameOrId: string) => {

    try {
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
        }

    } catch (error) {
        return null;
        //con esto o resolvemos un obj o devolvemos un null
    }
}
