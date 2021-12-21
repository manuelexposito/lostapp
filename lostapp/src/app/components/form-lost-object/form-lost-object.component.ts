import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/interfaces/lost-object';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-form-lost-object',
  templateUrl: './form-lost-object.component.html',
  styleUrls: ['./form-lost-object.component.css']
})
export class FormLostObjectComponent implements OnInit {

  categories !: Category [];
  
  currentRoute!: string;

  lostObjectForm = new FormGroup({
    category : new FormControl(),
    description : new FormControl(),
    ubication : new FormControl()
  })
  constructor(private userService : UserService, private router : Router ) {
    
   }


  ngOnInit(): void {
    this.getCategories();
    this.currentRoute = this.router.url;
    console.log(this.currentRoute)
  }


  getCategories(){

    return this.userService.getCategories().snapshotChanges().pipe(
      map((changes) =>
        changes.map(
          c => ({
            id: c.payload.doc.id, ...c.payload.doc.data()
          })
        )
      )
    ).subscribe(
      d => {
        this.categories = d
      }
    )
    /*
    return this.userService.getCategories().subscribe(

      r => { console.log(r)
            this.categories = }
    )*/
  }

  registerLostObject(){

    let idCategory = this.lostObjectForm.controls['category'].value;
    let description = this.lostObjectForm.controls['description'].value;
    let ubication = this.lostObjectForm.controls['ubication'].value;
    this.userService.addToLostObjects(idCategory, description, ubication).then(
      () => this.router.navigate(['/home'])
    )

  }

  //TODO: Habría que buscar una mejor forma de refactorizar ambos codigos..
  registerFoundObject(){

    let idCategory = this.lostObjectForm.controls['category'].value;
    let description = this.lostObjectForm.controls['description'].value;
    let ubication = this.lostObjectForm.controls['ubication'].value;
    this.userService.addToFoundObjects(idCategory, description, ubication).then(
      () => this.router.navigate(['/home'])
    )

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.lostObjectForm.controls['category'].value);
  }

  getUbication(event: google.maps.MapMouseEvent) {
    this.lostObjectForm.controls['ubication'].setValue(`${event.latLng?.lat()} , ${event.latLng?.lng()}`)
    console.log(`RECIBIDO EN PADRE: ${event.latLng?.lat()} , ${event.latLng?.lng()}`);

  }



}
