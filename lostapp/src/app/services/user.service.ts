import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public auth : AngularFireAuth, private firestore : AngularFirestore, private router : Router) { }


login(){

  this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(

    resp => {
      this.firestore.collection('users').doc(resp?.user?.uid)
      .set(
        {
          name : resp.user?.displayName,
          email : resp.user?.email,
          photo: resp.user?.photoURL
        }
      );

      localStorage.setItem('name', resp.user?.displayName? resp.user?.displayName: '');
      localStorage.setItem('photo', resp.user?.photoURL? resp.user?.photoURL: '');
      localStorage.setItem('uid', resp.user?.uid? resp.user?.uid: '');

    }
  )
}

logout(){

  this.auth.signOut()
}


}
