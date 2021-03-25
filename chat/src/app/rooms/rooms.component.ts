import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.less']
})
export class RoomsComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter<any>();
  @Input() userInfo: any;
  roomList: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }
  fetchRooms() {
    let args = {
      url:
        'api/chat/rooms/' + this.userInfo.clientId + '/' + this.userInfo.userId
    };
    this.dataService.getData(args).subscribe((data: any) => {
      this.roomList = data.payload;
    });
  }

  selectRoom(id: any) {
    this.eventEmitter.emit(id);
  }
}
