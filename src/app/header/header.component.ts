import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private _dataStorageService: DataStorageService) {}

  onSaveData() {
    this._dataStorageService.storeRecipes();
  }

  onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }
}
