import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkDarkTheme();
    });
  }

  checkDarkTheme() {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // Fix para Android Dark Mode, la implementacion esta en MainActivity.java
    if (window.navigator.userAgent.includes('AndroidDarkMode')) {
      document.body.classList.toggle( 'dark', true );
    }
    if (prefersDark.matches) {
      document.body.classList.toggle( 'dark' );
    }
  }
}
