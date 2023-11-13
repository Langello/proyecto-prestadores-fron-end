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
    SelectPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
