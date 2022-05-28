import { Container, Image, Text } from '@nextui-org/react'
import React from 'react'

export const NotFoundFavorites = () => {
    return (
        <Container css={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
            alignItem: 'center',
            justifyContent: 'center',
            alignSelft: 'center',
        }}>
            <Text h1> Not found Favorites </Text>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
                width={250}
                height={250}
                alt="Not found"
                css={{
                    opacity: 0.3,
                }}
            />
        </Container>
    )
}
