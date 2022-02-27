import { SocketService } from './socket-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  //messages: BehaviorSubject<any>;

  constructor(private wsService: SocketService) {

     wsService.getMessage().subscribe(data=>{
        console.log("in chat : ",data);
        
    })
  }

  

  sendMsg(msg: any) {
    //this.messages.next(msg);
  }
}
