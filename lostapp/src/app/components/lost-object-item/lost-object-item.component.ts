import { Component, Input, OnInit } from '@angular/core';

import { Category, LostObject } from 'src/app/models/interfaces/lost-object';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lost-object-item',
  templateUrl: './lost-object-item.component.html',
  styleUrls: ['./lost-object-item.component.css']
})
export class LostObjectItemComponent implements OnInit {

  @Input() lostObject !: LostObject
  //categoryName : string ;
  category !: Category;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getCategoryName();
  }

  getCategoryName(){
/*
    this.userService.getCategoryNameById(this.lostObject.categoryId).subscribe(

      r => this.categoryName = r?.name

    )*/

      this.userService.getCategoryNameById(this.lostObject.categoryId).subscribe(s => this.category = s.data() as Category)

  }

}
