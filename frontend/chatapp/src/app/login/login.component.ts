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
    private readonly chatservice: ChatService,
  ) {}
  entered(name: string) {
    this.chatservice.createuser.next(name)
  }

  ngOnInit(): void {
   
   this.chatservice.acks.subscribe(data =>{
     console.log("Got notofication : ",data);
     
   })
   this.chatservice.getError.subscribe(data =>{
     console.log("Got Error : ",data);
   })

  }
}
