import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import NextLink from 'next/link'
import Image from "next/image"

export const Navbar = () => {

    const { theme } = useTheme();

    return (
        <div style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            padding: "0 20px",
            backgroundColor: theme?.colors.gray50.value,
        }}>
            <NextLink href="/" passHref>
                <Link style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Image
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/392.png"
                        alt="icon app"
                        width={70}
                        height={70}
                    />

                    <Text color='white' h2>P</Text>
                    <Text color='white' h3>okémon</Text>
                </Link>
            </NextLink>

            <Spacer css={{flex: 1}}/>
            <NextLink href="/favorites/favorites" passHref>
                <Link>
                    <Text color='white'>Favorites</Text>
                </Link>
            </NextLink>
        </div>
    )
}
