import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { FormLostObjectComponent } from '../components/form-lost-object/form-lost-object.component';
import { HomeComponent } from '../pages/home/home.component';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';


const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])
const redirectUnathorizedToLanding = () => redirectUnauthorizedTo(['landing-page'])
const routes: Routes = [
  {path:'landing-page', component: LandingPageComponent},
  {path: 'home', component:HomeComponent, ...canActivate(redirectUnathorizedToLanding)},
  {path: 'add-lost-object', component:FormLostObjectComponent},
  {path: '', pathMatch:'full', component:LandingPageComponent, ...canActivate(redirectLoggedInToHome) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
