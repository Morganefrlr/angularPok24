import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit{
  searchTerms = new Subject<string>()
  pokemons$: Observable<Pokemon[]>


  constructor(
    private router : Router, 
    private pokemonService : PokemonService
  ){}


 ngOnInit(): void {
   this.pokemons$ = this.searchTerms.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => this.pokemonService.searchPokemonList(term))
   )
 }


 search(term : string){
  this.searchTerms.next(term)
 }

  goToDetailPokemon(pokemon : Pokemon){
    const link = ['/pokemons', pokemon.id]
    this.router.navigate(link)
  }


}
