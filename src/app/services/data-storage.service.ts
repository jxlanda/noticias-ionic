import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/noticias';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  favoriteNews: Article[] = [];

  constructor(private storage: Storage, public toastCtrl: ToastController) { 
    this.loadFavoriteNews();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'bottom',
      animated: true
    });
    toast.present();
  }

  saveNews(news: Article) {
    const exist = this.favoriteNews.find(n => n.title === news.title);
    if (!exist) {
      this.favoriteNews.unshift(news);
      this.storage.set('favorite', this.favoriteNews);
      this.presentToast("Agregado a favoritos");
    }
  }

  deleteNews(news: Article){
    this.favoriteNews = this.favoriteNews.filter(n=>n.title !== news.title);
    this.storage.set('favorite', this.favoriteNews);
    this.presentToast("Eliminado de favoritos");
  }

  async loadFavoriteNews() {
    const favorites = await this.storage.get('favorite');
    if(favorites){
    this.favoriteNews = favorites;
    }
  }
}
