import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/interfaces/lost-object';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-lost-object',
  templateUrl: './form-lost-object.component.html',
  styleUrls: ['./form-lost-object.component.css']
})
export class FormLostObjectComponent implements OnInit {

  categories !: Category [];

  lostObjectForm = new FormGroup({
    category : new FormControl(),
    description : new FormControl(),
    ubication : new FormControl()
  })
  constructor(private userService : UserService, private router : Router ) { }

  ngOnInit(): void {
    this.getCategories();
    console.log(this.categories)
  }

  addLostObject(){

    let categoryObject = this.lostObjectForm.controls['category'].value;
    let descriptionObject = this.lostObjectForm.controls['description'].value;
    let ubicationObject = this.lostObjectForm.controls['ubication'].value;

    this.userService.addToLostObjects(categoryObject, descriptionObject, ubicationObject)
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.lostObjectForm.controls['category'].value);
  }



}
