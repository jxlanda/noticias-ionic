import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/noticias';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  noticias: Article[] = [];

  categorias = [
    {
      nombre: 'business',
      esp: 'Negocios'
    },
    {
      nombre: 'entertainment',
      esp: 'Entretenimiento'
    },
    {
      nombre: 'health',
      esp: 'Salud'
    },
    {
      nombre: 'science',
      esp: 'Ciencia'
    },
    {
      nombre: 'sports',
      esp: 'Deportes'
    },
    {
      nombre: 'technology',
      esp: 'Tecnología'
    }
  ];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0].nombre;
    this.loadNews(this.segment.value);
  }

  loadNews(category: string, event?){
    this.noticiasService.getTopHeadlinesCategory(category).subscribe(resp=>{
      if (resp.articles.length === 0 && event) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      if (event) {
        event.target.complete();
      }

      this.noticias.push(...resp.articles);
    });
  }

  categoryChanged(event){
    this.noticias = [];
    this.loadNews(event.detail.value);
  }

  loadNewsCategoryInfinite(event){
    this.loadNews(this.segment.value, event);
  }
}
