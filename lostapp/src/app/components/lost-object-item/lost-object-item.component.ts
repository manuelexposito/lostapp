import { Component, Input, OnInit } from '@angular/core';
import { LostObject } from 'src/app/models/interfaces/lost-object';

@Component({
  selector: 'app-lost-object-item',
  templateUrl: './lost-object-item.component.html',
  styleUrls: ['./lost-object-item.component.css']
})
export class LostObjectItemComponent implements OnInit {

  @Input() lostObject !: LostObject

  constructor() { }

  ngOnInit(): void {
  }

}
