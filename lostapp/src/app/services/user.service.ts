import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category, LostObject } from '../models/interfaces/lost-object';
import { Observable } from 'rxjs';

const USER_ID = localStorage.getItem('uid');

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
      this.router.navigate(['/home'])
    }
  )
}

logout(){

  this.auth.signOut()
}

addToLostObjects( idCategory : string, objectDescription : string, objectUbication : string ){

  return this.firestore.collection(`users/${USER_ID}/lost-objects`).add({

    description : objectDescription,
    categoryId : idCategory,
    ubication : objectUbication,
    //Aquí habría que hacer una comprobación para que sea true o false buscándolo en la base de datos
    hasMatch : false

  })

}

addToFoundObjects(){

}

getLostObjectsList(){

  return this.firestore.collection<LostObject>(`users/${USER_ID}/lost-objects`).valueChanges();
}

getFoundObjectsList(){
  return this.firestore.collection<LostObject>(`users/${USER_ID}/found-objects`).valueChanges();
}

//TODO: Este método debería ir en otro servicio
getCategories() : AngularFirestoreCollection<Category>{
  return this.firestore.collection(`categories`);
  //return this.firestore.collection<Category>('categories').valueChanges();
}

getCategoryNameById(categoryId : string){

  //return this.firestore.collection<Category>('categories').doc(categoryId).valueChanges()
  return this.firestore.collection('categories').doc(categoryId).get()
}

}
