import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/noticias';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;
  @Input() onFavorites: boolean;

  constructor(private iab: InAppBrowser,
    private actionsheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataStorage: DataStorageService,
    private platform: Platform) {

  }

  ngOnInit() { }

  openNews() {
    // Agregar _system para el navegador por defecto
    // Usar location yes para mostrar la barra de navegacion de inAppBrowser
    // this.iab.create(this.noticia.url,'_blank',{location: 'yes'});
    const browser = this.iab.create(this.noticia.url, '_blank', { location: 'yes' });
  }

  async openMenu() {
    let favorite;
    if (this.onFavorites) {
      favorite =
      {
        text: 'Borrar de favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataStorage.deleteNews(this.noticia);
        }
      }
    } else {
      favorite =
      {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataStorage.saveNews(this.noticia);
        }
      };
    }
    const actionSheet = await this.actionsheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.shareNews();
          }
        },
        favorite,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  shareNews() {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(this.noticia.title,
        this.noticia.source.name,
        null,
        this.noticia.url);
    } else {
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log("No es compatible");
      }
    }
  }
}
