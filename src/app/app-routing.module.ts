import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ModalSelectComponent } from './pages/modal-select/modal-select.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: SingUpComponent },
  { path: 'modal-select', component: ModalSelectComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
