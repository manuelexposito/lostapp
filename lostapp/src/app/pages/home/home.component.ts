import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { LostObject } from 'src/app/models/interfaces/lost-object';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foundObjects : LostObject [] = [];
  lostObjects : LostObject [] = [];

  // foundObjectsExist : boolean = false;
 // lostObjectsExist : boolean = false;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getLostObjectsList().subscribe(
      r => {this.lostObjects = r}
    )

    this.userService.getFoundObjectsList().subscribe(
      r => {this.foundObjects = r}
    )

  }



}
