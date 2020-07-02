import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InboxViewPage } from './inbox-view.page';

describe('InboxViewPage', () => {
  let component: InboxViewPage;
  let fixture: ComponentFixture<InboxViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InboxViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
