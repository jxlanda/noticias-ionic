import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/noticias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  showSearchbar: boolean;

  searchString: string = '';
  searching: boolean = false;
  searchResults: Article[] = [];
  slideOpts = {
    allowTouchMove: false
  };

  constructor(private noticiasService: NoticiasService) {
  }

  ngOnInit() {
    this.loadNews();
  }

  loadNews(event?) {

    if(this.searchResults.length > 0){

      this.noticiasService.getBySearch(this.searchString).subscribe(resp => {
        if (resp.articles.length === 0 && event) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        if (event) {
          event.target.complete();
        }
        // Se extrae e inserta de manera independiente cada noticia con ...
        this.searchResults.push(...resp.articles);
      });
    } else {
      
      this.noticiasService.getTopHeadlines().subscribe(resp => {
        if (resp.articles.length === 0 && event) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        if (event) {
          event.target.complete();
        }
        // Se extrae e inserta de manera independiente cada noticia con ...
        this.noticias.push(...resp.articles);
      });

    }


  }

  loadNewsInfinite(event) {
    this.loadNews(event);
  }

  searchNews(event){
    const newsToSearch = event.detail.value;
    this.searchString = newsToSearch;
    if (newsToSearch != "") {
      this.searching = true;
      this.noticiasService.getBySearch(newsToSearch).subscribe(resp => {
        this.searching = false;
        this.searchResults = resp.articles;
      });
    } else {
      this.searchResults = [];
    }
  }


}
