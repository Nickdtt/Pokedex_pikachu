import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface PokeMon {
  name: string;
  species: string;
  abilities: string[];
  images: string[];
}

export class PokemonClass{
  name: string;
  species: string;
  abilities: string[];
  images: string[];


  constructor(pokemon: any){
    this.name = pokemon.name;
    this.species = pokemon.species.name;
    this.abilities = [pokemon.abilities[0].ability.name, pokemon.abilities[1].ability.name];
    this.images = [pokemon.sprites.front_default, pokemon.sprites.back_default]
  }
}