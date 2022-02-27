import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket:any;

  constructor(){
    this.socket = io(`http://localhost:8000`);
  }

  createUser(data:string){
    return new Observable(obs =>{
      this.socket.emit('createuser', data)
      obs.next( "user created : "+data)
    })
  }

  getMessage(){
    return new Observable(obs =>{
      this.socket.on('userCreated',(data:any)=>{
        console.log("User created :::: ",data);
        obs.next(data)
      })

    })
  }


    // this.socket.on('chat message', (data:any) => {
    //   console.log("Received message from Websocket Server : ",data)
    // })

    // let observable = new Observable(observer => {
    //   console.log("JIJI");
    //     this.socket.on('chat message', (data:any) => {
    //       console.log("Received message from Websocket Server : ",data)
    //      // observer.next(data);
    //     })
    //     return () => {
    //       this.socket.disconnect();
    //     }
    // });

    // let observer = {      
    //     next: (data: Object) => {
    //         this.socket.emit('message', JSON.stringify(data));
    //     },
    // };

   




}
