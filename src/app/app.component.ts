import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tabState: 'giphy' | 'my-gifs' = 'my-gifs';
  gifCollection: StorageGifItem[] = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    const storageItem = localStorage.getItem('gifCollection');
    this.gifCollection = storageItem ? JSON.parse(storageItem) : [];
  }

  onTabSelect(data: TabDirective): void {
    switch (data.heading) {
      case 'Giphy':
        this.tabState = 'giphy';
        break;
      default:
        this.tabState = 'my-gifs';
        break;
    }
  }

  onNewItemAdded(item: StorageGifItem) {
    const { id, title, images } = item;
    const dateAdded = new Date(Date.now()).toLocaleString();
    this.gifCollection.push({ id, title, images, dateAdded });
    localStorage.setItem('gifCollection', JSON.stringify(this.gifCollection));
    this.toastr.success('Gif has been added to your collection', 'Success!', {
      timeOut: 2000,
    });
  }

  onItemRemoved(item: StorageGifItem) {
    this.gifCollection = this.gifCollection.filter((x) => x.id !== item.id);
    localStorage.setItem('gifCollection', JSON.stringify(this.gifCollection));
    this.toastr.info('Gif has been removed', 'OK!', {
      timeOut: 2000,
    });
  }

  download(gif: StorageGifItem) {
    fetch(gif.images.original.url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = gif.title + '.gif';
        link.click();
      });
  }
}

export interface StorageGifItem {
  id: string;
  title: string;
  images: any;
  dateAdded: string;
}
