import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlines } from '../interfaces/noticias';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKeyNews;
const apiUrl = environment.apiUrlNews;
const proxyUrl = environment.proxyUrl;

// const headers= new HttpHeaders()
//   .set('x-api-key', apiKey)
//   .set('Access-Control-Allow-Origin', 'http://localhost:8100');

const headers = new HttpHeaders({
  'x-api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  headlinePage = 0;
  searchPage = 0;

  categorySelected = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  // Genericos 

  private executeQuery<T>(query: string) {
    query = proxyUrl + apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinePage++;
    return this.executeQuery<TopHeadlines>(`/top-headlines?country=mx&page=${this.headlinePage}`);

    /*  return this.http.get<TopHeadlines>(`http://newsapi.org/v2/top-headlines?country=mx&apiKey=YOUR_API_KEY`); */
  }
  
  getTopHeadlinesCategory(category: string) {
    if (this.categorySelected === category)
      this.categoriaPage++;
    else {
      this.categoriaPage = 1;
      this.categorySelected = category;
    }
    return this.executeQuery<TopHeadlines>(`/top-headlines?country=mx&category=${category}&page=${this.categoriaPage}`);

    /* return this.http.get<TopHeadlines>(`http://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=YOUR_API_KEY`); */
  }

  getBySearch(search: string) {
    this.searchPage++;
    return this.executeQuery<TopHeadlines>(`/everything?q=${search}&language=es&page=${this.searchPage}`);
    /* return http://newsapi.org/v2/everything?q=bitcoin&language=es&apiKey=YOUR_API_KEY */
  }
}
