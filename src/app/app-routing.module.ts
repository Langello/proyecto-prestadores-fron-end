import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ModalSelectComponent } from './pages/modal-select/modal-select.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { PrestadoresComponent } from './pages/prestadores/prestadores.component';
import { PrestadoresDetailComponent } from './pages/prestadores-detail/prestadores-detail.component';
import { ContractComponent } from './pages/contract/contract.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'modal-select', component: ModalSelectComponent },
  { path: 'sing-in', component: SingInComponent },
  { path: 'prestadores', component: PrestadoresComponent },
  { path: 'prestador/:id', component: PrestadoresDetailComponent },
  { path: 'contract/:id', component: ContractComponent },
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
