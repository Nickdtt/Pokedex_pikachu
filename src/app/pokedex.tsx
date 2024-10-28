'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,

} from "@/components/ui/carousel"
import { PokeMon, PokemonClass } from "@/lib/utils";



export function Pokedex() {
    const [loading, setLoading] = useState(true);
    const [currentPokemon, setCurrentPokemon] = useState<PokemonClass | null>(null);
    const [raichu, setRaichu] = useState<PokemonClass | null>(null);
    const [pikachu, setPikachu] = useState<PokemonClass | null>(null);



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [response1, response2] = await Promise.all([
                    fetch("https://pokeapi.co/api/v2/pokemon/pikachu/"),
                    fetch("https://pokeapi.co/api/v2/pokemon/raichu/"),
                ]);

                if (!response1.ok || !response2.ok) {
                    throw new Error("Erro nas requisicoes");
                }

                const [result1, result2] = await Promise.all([
                    response1.json(),
                    response2.json(),
                ]);

                console.log("Pikachu Data:", result1);
                console.log("Raichu Data:", result2);

                const pikachuData = new PokemonClass(result1);
                const raichuData = new PokemonClass(result2)

                setCurrentPokemon(pikachuData);
                setPikachu(pikachuData);
                setRaichu(raichuData);

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const handleChangePokemon = () => {
        if(currentPokemon == pikachu){
            setCurrentPokemon(raichu);
        } else {
            setCurrentPokemon(pikachu);
        }
    }

    return (

        <div className="flex flex-col items-center bg-red-500 rounded-lg shadow-lg p-6 max-w-xs mx-auto border-2 border-gray-300">
            {loading ? (<p>carregando...</p>) : (
                <>
                    <div className="flex w-full">
                        <Carousel className="flex-grow">
                            <CarouselContent className="flex">
                                {currentPokemon?.images.map((src, index) => (
                                    <CarouselItem key={index}>
                                        <div className="flex justify-center">
                                            <Card className="w-full">
                                                <CardContent>
                                                    <Image src={src} alt={`${currentPokemon.name}`} width={300} height={300} className="rounded-lg shadow-md" />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="bg-white text-red-500 rounded-full p-2 hover:bg-gray-300 transition duration-200" />
                            <CarouselNext className="bg-white text-red-500 rounded-full p-2 hover:bg-gray-300 transition duration-200" />
                        </Carousel>
                    </div><div className="p-4 text-center bg-white rounded-lg w-full mt-4">
                        <h2 className="text-2xl font-bold text-red-600">{currentPokemon?.name}</h2>
                        <div className="mt-2">
                            <p className="text-sm text-gray-700 bg-red-100 p-2 rounded-md border border-red-300">
                                Espécie: <span className="font-semibold">{currentPokemon?.species}</span>
                            </p>
                            <p className="text-sm text-gray-700 bg-red-100 p-2 rounded-md border border-red-300 mt-1">
                                Habilidade: <span className="font-semibold">{currentPokemon?.abilities[1]}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleChangePokemon} className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-200">
                            Ver evolução
                        </button>
                    </div>
                </>
            )}
        </div>


    )


}