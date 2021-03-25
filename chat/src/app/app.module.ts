import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    RoomsComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{ 
 
}
