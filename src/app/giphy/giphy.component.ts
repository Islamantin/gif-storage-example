import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { StorageGifItem } from '../app.component';
import { ButtonAction } from '../gif-item/gif-item.component';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss'],
})
export class GiphyComponent implements OnInit, OnChanges {
  searchTerm: string = '';
  searchTitle: string = '';
  searchResults: any[] = [];

  @Input() downloadCallback = (item: StorageGifItem) => {};
  @Input() opened: boolean = false;
  @Input() gifCollection: StorageGifItem[] = [];
  @Output() gifCollectionNewItemAdded = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { opened } = changes;
    if (opened && opened.currentValue && !opened.firstChange) {
      this.showTrending();
    }
  }

  showTrending() {
    this.requestAndProcess(
      `https://api.giphy.com/v1/gifs/trending?api_key=${environment.apiKey}`
    );
    this.searchTitle = 'Trending';
  }

  searchGifs() {
    if (this.searchTerm.length < 1) {
      this.showTrending();
      return;
    }
    this.requestAndProcess(
      `https://api.giphy.com/v1/gifs/search?api_key=${environment.apiKey}&q=${this.searchTerm}`
    );
    this.searchTitle = "Results on term \'" + this.searchTerm + "\'";
  }

  requestAndProcess(url: string) {
    this.http.get(url).subscribe((response: any) => {
      this.searchResults = (response.data as any[]).filter(
        (x) => !this.gifCollection.some((y) => x.id === y.id)
      );
    });
  }

  getPlaceholders() {
    const placeholdersNumber = (3 - (this.searchResults.length % 3))%3;
    return Array(placeholdersNumber);
  }

  addGifToCollection(gif: any) {
    const ind = this.searchResults.findIndex((x) => x.id === gif.id);
    const item = this.searchResults.splice(ind, 1)[0];
    this.gifCollectionNewItemAdded.emit(item);
  }

  getItemActions(): ButtonAction[] {
    return [
      { title: 'Add', callback: (item) => this.addGifToCollection(item) },
      { title: 'Download', callback: (item) => this.downloadCallback(item) },
    ];
  }
}
