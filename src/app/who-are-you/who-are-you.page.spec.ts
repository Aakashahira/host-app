import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhoAreYouPage } from './who-are-you.page';

describe('WhoAreYouPage', () => {
  let component: WhoAreYouPage;
  let fixture: ComponentFixture<WhoAreYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoAreYouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhoAreYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
