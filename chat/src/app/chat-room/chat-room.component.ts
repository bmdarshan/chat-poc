import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges
} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less']
})
export class ChatRoomComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter<any>();
  @Input() userInfo: any;
  @Input() roomId: any;
  @Input() receivedMessage: any;
  chatHistory: any = [];
  chat: any = '';
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.initializeWebsocketConnection();
  }

  initializeWebsocketConnection() {
    this.dataService.getWebsocketData().subscribe(data => {
      if (
        data &&
        data.metaData &&
        data.metaData.eventType === 'CHAT_MESSAGE' &&
        data.payload
      ) {
        this.chatHistory.push(data.payload);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.roomId) {
      this.fetchMessages();
    }
  }

  fetchMessages() {
    let args = {
      url: 'api/chat/get-chat/' + this.userInfo.clientId + '/' + this.roomId
    };
    this.dataService.getData(args).subscribe((data: any) => {
      this.chatHistory = data.payload;
    });
  }

  send() {
    this.eventEmitter.emit(this.chat);
  }
}
