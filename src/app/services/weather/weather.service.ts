import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseUrl = 'https://foreca-weather.p.rapidapi.com';
  headers = new HttpHeaders({
    'X-RapidAPI-Key': 'f7dbbc18bemsh20f020e3aa1ea26p150927jsn65638c41e927',
    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  searchLocation(query: string) {
    return this.http
      .get(`${this.baseUrl}/location/search/${query}?lang=en`, {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => {
          return res.locations as any[];
        })
      );
  }

  private currentWeather(locationId: number) {
    return this.http
      .get(
        `${this.baseUrl}/current/${locationId}?alt=0&tempunit=C&windunit=KMH&tz=Europe%2FLondon&lang=en`,
        { headers: this.headers }
      )
      .pipe(
        map((res: any) => {
          return res.current;
        })
      );
  }

  private hourlyWeather(locationId: number) {
    return this.http
      .get(
        `${this.baseUrl}/forecast/hourly/${locationId}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&periods=12&dataset=full&history=0`,
        { headers: this.headers }
      )
      .pipe(
        map((res: any) => {
          return res.forecast as any[];
        })
      );
  }

  private dailyWeather(locationId: number) {
    return this.http
      .get(
        `${this.baseUrl}/forecast/daily/${locationId}?alt=0&tempunit=C&windunit=MS&periods=12&dataset=full`,
        { headers: this.headers }
      )
      .pipe(
        map((res: any) => {
          return res.forecast as any[];
        })
      );
  }

  getWeather(locationId: number) {
    return forkJoin({
      current: this.currentWeather(locationId),
      hourly: this.hourlyWeather(locationId),
      daily: this.dailyWeather(locationId),
    });
  }
}