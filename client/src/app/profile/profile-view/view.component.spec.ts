import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewComponent } from './view.component';
import { PersonInformationListComponent } from './person-information-list/person-information-list.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  
  let personalInfoComponent: PersonInformationListComponent;
  let personalInfoFixture: ComponentFixture<PersonInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ ViewComponent, PersonInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    personalInfoFixture = TestBed.createComponent(PersonInformationListComponent);
    personalInfoComponent = personalInfoFixture.componentInstance;
    personalInfoComponent.detailedPersonalInformation = {
      personalInformation: [{label: 'Test', value: 'TestValue'}],
      aboutInformation: 'Test About Information'
    };
    personalInfoFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
