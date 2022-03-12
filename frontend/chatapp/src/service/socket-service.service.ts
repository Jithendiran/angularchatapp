import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket:any;

  constructor(){
    this.socket = io(`http://localhost:8000`);
  }

  getack():Observable<any>{
    return new Observable(obs =>{
      this.socket.on('ack', (data:any) =>{
        obs.next(data)
      })
    })
  }

  createUser(data:string){    
      this.socket.emit('createuser', data)

  }

  getMessage(){
    return new Observable(obs =>{
      this.socket.on('receiveMsg',(data:any)=>{
        obs.next(data)
      })

    })
  }

  // sendMessage(msg:string){
  //   return new Observable(obs =>{
  //     this.socket.emit('sendMsg',msg)
  //   })
  // }
  sendMessage(msg:string){
    this.socket.emit('sendMsg',msg)
  }

  getError(){
    return new Observable(obs =>{
      this.socket.on('error',(data:any)=>{
        obs.next(data)
      })
    })

  }

  // createRoom(){
  //   return new Observable(obs =>{
  //     this.socket.emit('createRoom')
  //   })
  // }

  createRoom(){
    this.socket.emit('createRoom')
  }

  // joinRoom(roomid:string){
  //   return new Observable(obs =>{
  //     this.socket.emit('joinroom', roomid)
  //     obs.next(roomid)
  //   })
  joinRoom(roomid:string){
    this.socket.emit('joinroom', roomid)
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
