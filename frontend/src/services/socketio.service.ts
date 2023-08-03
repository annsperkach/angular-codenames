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

  startGame (gameId: string) {
    this.socket.emit('startGame', { gameId: gameId });
  }

  sendGameUpdate(gameId: string, words: any) {
    this.socket.emit('gameUpdate', { gameId: gameId, words: words });
  }

  receiveJoinedPlayers() {
    return new Observable((observer) => {
      this.socket.on('joinGame', (message) => {
        observer.next(message);
      })
    })
  }

  receiveStartGame() {
    return new Observable((observer) => {
      this.socket.on('startGame', (words) => {
        observer.next(words);
      });
    });
  }

  receiveGameUpdate(gameId: string) {
    return new Observable((observer) => {
      this.socket.on(gameId, (words) => {
        observer.next(words);
      });
    });
  }
} 
