import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public auth : AngularFireAuth, private user : UserService) { }

  ngOnInit(): void {
  }

  //TODO: SOLUCIONAR ERROR CON LOGIN
  doLogin(){
    this.user.login();
  }
}
