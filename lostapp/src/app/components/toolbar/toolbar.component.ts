import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private userService : UserService) { }
  username !: string;
  ngOnInit(): void {

    this.username = localStorage.name 

  }

  logout(){
    this.userService.logout();
  }

}
