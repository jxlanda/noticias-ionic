import { Component } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  slideOpts = {
    allowTouchMove: false
  };

  constructor(public dataStorage: DataStorageService) {
  }

}
