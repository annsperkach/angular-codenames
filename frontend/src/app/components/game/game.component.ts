import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from 'src/services/socketio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  gameId: string | undefined ;
  role = "operative";

  constructor (private socketioService: SocketioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id') || '';
    this.socketioService.connect(this.gameId);
    this.receiveJoinedPlayers();
  }

  nextGame () {

  }

  startGame () {
    
  }

  receiveJoinedPlayers() {
    this.socketioService.receiveJoinedPlayers().subscribe((message) => {
      console.log(message);
    });
  }
}
