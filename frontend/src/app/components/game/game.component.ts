import { Component, OnInit } from '@angular/core';
import { SocketioService } from 'src/services/socketio.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  constructor (private socketioService: SocketioService) { }

  ngOnInit(): void {
    this.socketioService.connect();
  }

  role = "operative";

  nextGame () {

  }

  startGame () {
    
  }
}
