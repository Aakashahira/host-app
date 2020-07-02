import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserGalleryPage } from './user-gallery.page';

describe('UserGalleryPage', () => {
  let component: UserGalleryPage;
  let fixture: ComponentFixture<UserGalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGalleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
