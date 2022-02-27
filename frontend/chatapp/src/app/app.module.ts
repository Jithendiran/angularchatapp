import { SocketService } from './../service/socket-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
