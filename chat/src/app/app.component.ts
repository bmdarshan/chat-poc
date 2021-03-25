import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as uuid from 'uuid';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  userInfo: any = {
    clientId: 'petco',
    userId: 'asd',
    userrole: 'admin'
  };
  roomId: any;
  receivedMessage: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.initializeWebsocketConnection();
  }

  initializeWebsocketConnection() {
    this.connect();
  }

  connect() {
    let args = {
      eventType: 'CONNECT'
    };
    this.send(args);
  }

  send(args: any) {
    const myId = uuid.v4();
    let metaData = {
      id: myId,
      clientId: this.userInfo.clientId,
      userId: this.userInfo.userId,
      eventType: args.eventType
    };

    this.dataService.pushWebsocketData({
      metaData: metaData,
      payload: args.payload
    });
  }

  createRoom(roomInfo: any) {
    let args = {
      url: '/api/chat/rooms/add-room',
      body: {
        metaData: {
          clientId: this.userInfo.clientId,
          userId: this.userInfo.userId,
          userRole: this.userInfo.userRole
        },
        payload: {
          users: roomInfo.userText.split(','),
          roomName: roomInfo.roomText,
          nodeIds: []
        }
      }
    };
    this.dataService.postData(args).subscribe((data: any) => {});
  }

  selectRoom(id: any) {
    this.roomId = id;
  }

  sendMessage(msg: any) {
    if (this.roomId) {
      let args = {
        eventType: 'SEND_MESSAGE',
        payload: {
          msg: msg,
          roomId: this.roomId
        }
      };
      this.send(args);
    }
  }
}
