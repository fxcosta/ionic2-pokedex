import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Pokemon } from '../../models/pokemon';

@Injectable()
export class PokedexService {

  private pokemons: Array<Pokemon>;
  private pokemonSpecies: any[];
  private pokemonEvolutions: any[];
  private pokemonTypes: any[];

  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'data/v2/';
  }

  getAllPokemon() {
    if (this.pokemons) {
      return Observable.of(this.pokemons);
    } else {
      return this.http.get(this.baseUrl  + 'pokemon.json')
              .map((res: Response) => res.json().results)
              .do((data) => { this.pokemons = data; })
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  getPokemon(id: number){
    return this.getAllPokemon()
      .map((res: Response) => res[id-1]);
  }

  getAllSpecies(){
    if (this.pokemonSpecies) {
      return Observable.of(this.pokemonSpecies);
    } else {
      return this.http.get(this.baseUrl  + 'pokemon-species.json')
              .map((res: Response) => res.json().results)
              .do((data) => { this.pokemonSpecies = data; });
    }
  }

  getSpecies(id: number){
    return this.getAllSpecies()
      .map((res: Response) => res[id-1]);
  }

  getEvolutions(){
    if (this.pokemonEvolutions) {
      return Observable.of(this.pokemonEvolutions);
    } else {
      return this.http.get(this.baseUrl  + 'evolutions.json')
              .map((res: Response) => res.json())
              .do((data) => { this.pokemonEvolutions = data; });
    }
  }

  getEvolution(id: number){
    return this.getEvolutions()
      .map((res: Response) => res[id-1]);
  }

  getTypes(){
    if (this.pokemonTypes) {
      return Observable.of(this.pokemonTypes);
    } else {
      return this.http.get(this.baseUrl  + 'types.json')
              .map((res: Response) => res.json().results)
              .do((data) => { this.pokemonTypes = data; });
    }
  }

  getType(id: number){
    return this.getTypes().map((res: Response) => res[id-1]);
  }

  doMultipleRequests(observableBatch: any[]){
    return Observable.forkJoin(observableBatch);
  }

}
