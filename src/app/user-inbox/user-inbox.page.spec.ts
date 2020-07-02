import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserInboxPage } from './user-inbox.page';

describe('UserInboxPage', () => {
  let component: UserInboxPage;
  let fixture: ComponentFixture<UserInboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
