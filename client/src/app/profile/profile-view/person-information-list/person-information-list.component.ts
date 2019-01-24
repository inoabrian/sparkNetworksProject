import { Component, OnInit, Input } from '@angular/core';
import { PersonalInformation } from '../../shared/profile.model';

@Component({
  selector: 'app-person-information-list',
  templateUrl: './person-information-list.component.html',
  styleUrls: ['./person-information-list.component.css']
})
export class PersonInformationListComponent implements OnInit {

  detailedPersonalInformation: PersonalInformation;

  @Input() 
  set personal_information(data: PersonalInformation) {
    this.detailedPersonalInformation = data;
  }

  constructor() { }

  ngOnInit() {
  }

}
