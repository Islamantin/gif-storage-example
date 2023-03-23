import { Component, Input } from '@angular/core';
import { StorageGifItem } from '../app.component';

@Component({
  selector: 'app-gif-item',
  templateUrl: './gif-item.component.html',
  styleUrls: ['./gif-item.component.scss'],
})
export class GifItemComponent {
  @Input() actions: ButtonAction[] = [];
  @Input() item: StorageGifItem = {
    id: '',
    title: '',
    images: undefined,
    dateAdded: ''
  };
}

export interface ButtonAction {
  title: string;
  callback: (item: StorageGifItem) => void;
}
