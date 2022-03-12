import { SocketService } from './socket-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  getmsg:Subject<any> = new Subject()
  sendmsg:Subject<any> = new Subject()
  createuser:Subject<any> = new Subject()
  getError:Subject<any> = new Subject()
  createRoom:Subject<any> = new Subject()
  joinRoom:Subject<any> = new Subject()

  acks:Subject<any> = new Subject()
  constructor(private wsService: SocketService) {

    this.createuser.subscribe(data =>{
      this.wsService.createUser(data)
    })

    wsService.getMessage().subscribe(data =>{
      console.log("In get msg");
      
      this.getmsg.next(data)
    })

     this.sendmsg.subscribe(tomsg =>{
       console.log("In send msg");
       
      this.wsService.sendMessage(tomsg)
    })

    wsService.getError().subscribe(data =>{
      this.getError.next(data)
    })

    this.joinRoom.subscribe(roomId =>{
      console.log("In join room");
      
      this.wsService.joinRoom(roomId)
    })

    this.createRoom.subscribe(data =>{
      console.log("In create room");
      this.wsService.createRoom()
    })
 
    this.wsService.getack().subscribe(data =>{
      this.acks.next(data)
    })
  }

  
}
