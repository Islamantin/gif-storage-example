import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGifComponent } from './user-gif.component';

describe('UserGifComponent', () => {
  let component: UserGifComponent;
  let fixture: ComponentFixture<UserGifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
