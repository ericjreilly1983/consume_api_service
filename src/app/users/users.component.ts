import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from '../member';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  filterString = '';
  apiNameList: Member[];
  filteredUsers: Member[];
  subscription: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.serveUsers();

    this.getFilteredUsers();
  }

  transformPlus(event) {

   var span = event.path[1].childNodes[1].innerHTML;
   if(span == '+'){
      event.path[1].childNodes[1].innerHTML = '-'
   }else {
     event.path[1].childNodes[1].innerHTML = '+'
   }
   
  }

  serveUsers() {
    this.subscription = this.usersService.serveUsers()
      .subscribe(users => {this.apiNameList = users; this.filteredUsers = users});
  }

  getFilteredUsers() {
    if(this.filterString === ''){
      this.filteredUsers =  this.apiNameList;
    }else{
      this.filteredUsers = this.apiNameList.filter(user => user.name.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1);
    }
    
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
