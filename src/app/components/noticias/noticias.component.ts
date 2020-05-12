import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/noticias';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() onFavorites: boolean = false;
  
  constructor() { }

  ngOnInit() { }

}
