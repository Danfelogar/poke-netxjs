
const toggleFavorite = (id: number) =>{
    console.log('toggleFavorite', id);

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if(favorites.includes(id)){
        favorites = favorites.filter(item => item !== id);
    }else{
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify( favorites ));
}

const exitsInFavorites = (id: number):boolean =>{

    if( typeof window === 'undefined') return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
}

const pokemons = ():number[] =>{
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export default{
    toggleFavorite,
    exitsInFavorites,
    pokemons
}