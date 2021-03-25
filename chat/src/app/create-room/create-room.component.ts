import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.less']
})
export class CreateRoomComponent implements OnInit {
  roomText: any;
  userText: any;
  @Output() eventEmitter = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onRoomEnter(event: any) {
    this.roomText = event.target.value;
  }

  onUsersEnter(event: any) {
    this.userText = event.target.value;
    if (event.keyCode == '13' && this.userText) {
      let newObj = {
        roomText: this.roomText,
        userText: this.userText
      };

      this.eventEmitter.emit(newObj);
    }
  }
}
