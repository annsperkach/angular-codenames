import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {io, Socket} from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

   socket: Socket = io(environment.SOCKET_ENDPOINT);

  constructor() {}

  connect(gameId: string) {
    this.socket.emit('joinGame', { gameId: gameId });
  }

  receiveJoinedPlayers() {
    return new Observable((observer) => {
      this.socket.on('joinGame', (message) => {
        observer.next(message);
      })
    })
  }
} 
