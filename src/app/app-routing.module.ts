import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ModalSelectComponent } from './pages/modal-select/modal-select.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'modal-select', component: ModalSelectComponent },
  { path: 'sing-in', component: SingInComponent },
  { path: '**', redirectTo: 'sing-up' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
