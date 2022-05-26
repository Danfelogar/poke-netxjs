import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../../components/layouts'

const PokemonPge = () => {

    const router = useRouter();
    return (
        <Layout title='Algún Pokemon'>
            <h1>Algún Pokemon</h1>
        </Layout>
    )
}

export default PokemonPge