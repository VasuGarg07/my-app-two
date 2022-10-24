import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimeQuote } from 'src/app/helpers/interfaces';
@Injectable({
  providedIn: 'root',
})
export class AnimeQuotesService {
  titlesUrl = 'https://animechan.vercel.app/api/available/anime';

  baseUrl = 'https://animechan.vercel.app/api/quotes';

  constructor(private http: HttpClient) {}

  // animeListUrl(): Observable<string[]> {
  //   return this.http.get<string[]>(this.titlesUrl);
  // }

  randomQoutes(page: number): Observable<AnimeQuote[]> {
    return this.http.get<AnimeQuote[]>(`${this.baseUrl}?page=${page}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  search(
    option: boolean,
    query: string,
    page: number
  ): Observable<AnimeQuote[]> {
    const url = option
      ? `${this.baseUrl}/anime?title=${query}&page=${page}`
      : `${this.baseUrl}/character?name=${query}&page=${page}`;
    return this.http.get<AnimeQuote[]>(url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
