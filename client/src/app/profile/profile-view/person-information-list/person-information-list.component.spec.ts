import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PersonInformationListComponent } from './person-information-list.component';
import { ViewComponent } from '../view.component'

describe('PersonInformationListComponent', () => {
  let viewComponent: ViewComponent;
  let viewFixture: ComponentFixture<ViewComponent>;
  let component: PersonInformationListComponent;
  let fixture: ComponentFixture<PersonInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ViewComponent, PersonInformationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    viewFixture = TestBed.createComponent(ViewComponent);
    viewComponent = viewFixture.componentInstance;
    viewComponent.profile = {
      "userId": "1",
      "display_name": "Display Name",
      "real_name": "Real Name",
      "profile_picture": null,
      "birthday": "01/01/1990",
      "gender": "Male",
      "ethnicity": "Latino",
      "religion": "Other",
      "figure": "Athletic",
      "marital_status": "Never Married",
      "height": "5ft 8in",
      "occupation": "Software Engineer",
      "about_me": "Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "location": { "lat": "48°51'N", "lon": "2°21'E" }
    };
    viewFixture.detectChanges();

    fixture = TestBed.createComponent(PersonInformationListComponent);
    component = fixture.componentInstance;
    component.detailedPersonalInformation = viewComponent.getPersonalInformationList();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(viewComponent).toBeTruthy();
  });
});
