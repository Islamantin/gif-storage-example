import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StorageGifItem } from '../app.component';
import { ButtonAction } from '../gif-item/gif-item.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-user-gif',
  templateUrl: './user-gif.component.html',
  styleUrls: ['./user-gif.component.scss'],
})
export class UserGifComponent implements OnInit, OnChanges {
  sortStrategy: 'newest' | 'oldest' = 'newest';
  shownGifs: StorageGifItem[] = [];
  searchText: string = '';

  @Input() downloadCallback = (item: StorageGifItem) => {};
  @Input() opened: boolean = false;
  @Input() gifCollection: StorageGifItem[] = [];
  @Output() gifCollectionItemRemoved = new EventEmitter<any>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { opened } = changes;
    if (opened && opened.currentValue) {
      this.searchText = '';
      this.sortGifs(this.gifCollection);
    }
  }

  onSortStrategyChanged(event: any) {
    this.sortStrategy = event.target.value;
    if (this.searchText.length > 0) this.sortGifs(this.shownGifs);
    else this.sortGifs(this.gifCollection);
  }
  onFilterInput() {
    if (this.searchText.length > 0) this.filterGifs(this.shownGifs);
    else this.filterGifs(this.gifCollection);
  }

  filterGifs(gifs: StorageGifItem[]) {
    this.shownGifs = [...gifs].filter((gif) => {
      return gif.title.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  sortGifs(gifs: StorageGifItem[]) {
    switch (this.sortStrategy) {
      case 'newest':
        this.shownGifs = [...gifs].sort((a, b) => {
          return Date.parse(b.dateAdded) - Date.parse(a.dateAdded);
        });
        break;
      case 'oldest':
        this.shownGifs = [...gifs].sort((a, b) => {
          return Date.parse(a.dateAdded) - Date.parse(b.dateAdded);
        });
        break;
    }
  }

  removeFromCollection(gif: StorageGifItem) {
    const ind = this.shownGifs.findIndex((x) => x.id === gif.id);
    const item = this.shownGifs.splice(ind, 1)[0];
    this.gifCollectionItemRemoved.emit(item);
  }

  getPlaceholders() {
    const placeholdersNumber = (3 - (this.shownGifs.length % 3)) % 3;
    return Array(placeholdersNumber);
  }

  getItemActions(): ButtonAction[] {
    return [
      { title: 'Remove', callback: (item) => this.removeFromCollection(item) },
      { title: 'Download', callback: (item) => this.downloadCallback(item) },
    ];
  }

  // WIP below

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadFile(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', environment.apiKey);

    this.http
      .post('https://upload.giphy.com/v1/gifs', formData)
      .subscribe((response: any) => {
        console.log(response.data);
        // TODO
      });
  }

  upload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      this.uploadFile(file);
    };
    input.click();
  }
}
