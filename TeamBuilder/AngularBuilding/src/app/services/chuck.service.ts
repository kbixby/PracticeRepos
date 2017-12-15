import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ChuckService {

  constructor(private http: Http) { }
  // GET https://api.chucknorris.io/jokes/random
  public getChuckNorrisWisdom() {
    return this.http.get('https://api.chucknorris.io/jokes/random');
  }
}
