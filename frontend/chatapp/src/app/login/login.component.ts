import { BehaviorSubject } from 'rxjs';
import { SocketService } from './../../service/socket-service.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/service/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    // private readonly chatservice: ChatService,
    private readonly socketService: SocketService
  ) {}

  msg:BehaviorSubject<any> = new BehaviorSubject(0)
  entered(name: string) {
    this.socketService.createUser(name).subscribe(data=>{
      console.log("In login : ",data);
    })
  }

  ngOnInit(): void {}
}
