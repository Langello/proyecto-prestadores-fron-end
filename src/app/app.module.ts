import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ProfesionalesComponent } from './components/profesionales/profesionales.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ModalSelectComponent } from './pages/modal-select/modal-select.component';
import { SelectPerfilComponent } from './components/select-perfil/select-perfil.component';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { HttpClientModule } from '@angular/common/http';
import { PrestadoresComponent } from './pages/prestadores/prestadores.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ProfesionalDetalleComponent } from './components/profesional-detalle/profesional-detalle.component';
import { PrestadoresDetailComponent } from './pages/prestadores-detail/prestadores-detail.component';
import { ContratarComponent } from './components/contratar/contratar.component';
import { ContractComponent } from './pages/contract/contract.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ProfesionalesComponent,
    FooterComponent,
    RegistroComponent,
    HomeComponent,
    SingUpComponent,
    ModalSelectComponent,
    SelectPerfilComponent,
    LoginComponent,
    SingInComponent,
    PrestadoresComponent,
    BienvenidaComponent,
    ProfesionalDetalleComponent,
    PrestadoresDetailComponent,
    ContratarComponent,
    ContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
