import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ModalSelectComponent } from './pages/modal-select/modal-select.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { PrestadoresComponent } from './pages/prestadores/prestadores.component';
import { PrestadoresDetailComponent } from './pages/prestadores-detail/prestadores-detail.component';
import { ContractComponent } from './pages/contract/contract.component';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { TrabajosDatailComponent } from './pages/trabajos-datail/trabajos-datail.component';
import { PostulateComponent } from './pages/postulate/postulate.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { MiPerfilConsumidorComponent } from './pages/mi-perfil-consumidor/mi-perfil-consumidor.component';
import { MiPerfilPrestadorComponent } from './pages/mi-perfil-prestador/mi-perfil-prestador.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'modal-select', component: ModalSelectComponent },
  { path: 'sing-in', component: SingInComponent },
  { path: 'prestadores', component: PrestadoresComponent },
  { path: 'prestador/:id', component: PrestadoresDetailComponent },
  { path: 'contract/:id', component: ContractComponent },
  { path: 'trabajos', component: TrabajosComponent },
  { path: 'trabajo/:id', component: TrabajosDatailComponent },
  { path: 'postulate/:id', component: PostulateComponent },
  { path: 'account', component: CuentaComponent },
  { path: 'help', component: AyudaComponent },
  { path: 'my-profile-consumer', component: MiPerfilConsumidorComponent },
  { path: 'my-profile-provider', component: MiPerfilPrestadorComponent }, 
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
