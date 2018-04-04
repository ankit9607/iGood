import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgForageModule} from "@ngforage/ngforage-ng5";
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './component/front-page/front-page.component';
import { AppRoutingModule } from './module/router/app-routing/app-routing.module';
import { StrikeService } from './service/strike/strike.service';
import { LocalForageService } from './service/local-forage/local-forage.service';
import { NewActivityComponent } from './component/new-activity/new-activity.component';
import { SocketService } from './service/socket/socket.service';
import { DbService } from './service/dbservice/db.service';


@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    NewActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgForageModule,
    FormsModule
  ],
  providers: [StrikeService, LocalForageService, SocketService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
