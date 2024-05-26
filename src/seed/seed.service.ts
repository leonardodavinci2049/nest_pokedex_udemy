import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/core/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // Nessa parte do código é inserido um registro por vez
    /*    const insertPromissesArray = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      insertPromissesArray.push(this.pokemonModel.create({ name, no, url }));
    });

    // Usar Promise.all espera por alguns atrasos
    // será resolvido depois que todos os atrasos terminarem,
    // mas lembre-se de que eles são executados ao mesmo tempo:

    await Promise.all(insertPromissesArray); */

    // Nessa parte do código é inserido multiplos registros de uma vez

    const pokemonToInsert: { no: number; name: string; url }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no, url }); // [{ name: bulbasaur, no: 1 }]
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return pokemonToInsert;
  }
}
