import React, { FC } from 'react'
import { Grid, Card, Text, Row } from '@nextui-org/react';

import { SmallPoke } from "../../interfaces";
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPoke
}
export const PokemonCard: FC<Props> = ({pokemon: { id, img, name }}) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/pokemon/${id}`);
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1}  key={id}>
            <Card hoverable clickable onClick={onClick}>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                    src={img}
                    width="100%"
                    height={ 140 }
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                    <Text transform='capitalize'># {id}</Text>
                    <Text>{name}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
)
}