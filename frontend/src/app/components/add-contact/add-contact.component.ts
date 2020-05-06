import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  groupList = [];
  constructor(private groups: GroupsService) { }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
  }

}
