import { Injectable } from '@angular/core';
import { Hero } from './heroes';
import { HEROES } from './mock-heroes';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
@Injectable()
export class HeroService {
    
    private heroesUrl = 'http://localhost:58892/api';
  constructor(
    private http:HttpClient
  ) { }

  getHeroes(): Observable<Hero[]>{
    const url = this.heroesUrl + '/Heroes';
    return this.http.get<Hero[]>(url)
    
  }
  getHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + '/Heroes'+ '/' + id;
    return this.http.get<Hero>(url)
    
    } 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(error);
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of(result as T);
      };
    }

    updateHero (hero: Hero): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.put(this.heroesUrl+'/Heroes/'+hero.id, hero, httpOptions);
    }

    addHero (hero: Hero): Observable<Hero> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<Hero>(this.heroesUrl+'/Heroes', hero, httpOptions);
    }
    /** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions);
}

}
