import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  show = false;
  groupList = [];
  constructor(private groups: GroupsService) { }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
  }


  showPanel() {
    this.show = this.show === true ? false : true;
  }


}
