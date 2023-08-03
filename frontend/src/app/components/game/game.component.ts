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
  words: any ;

  constructor (
    private socketioService: SocketioService, 
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id') || '';
    this.socketioService.connect(this.gameId);
    this.receiveJoinedPlayers();
    this.receiveStartGame();
  }

  nextGame () {
    this.gameId = this.route.snapshot.paramMap.get('id') || '';
    this.socketioService.startGame(this.gameId);
  }

  startGame () {
    this.gameId = this.route.snapshot.paramMap.get('id') || '';
    this.socketioService.startGame(this.gameId);
  }

  receiveJoinedPlayers() {
    this.socketioService.receiveJoinedPlayers().subscribe((message: unknown) => {
      if (typeof message === 'string') {
        this.snackbar.open(message, '', {
        duration: 3000,
      });
    }
  });
 }

 receiveStartGame() {
  this.socketioService.receiveStartGame().subscribe((words) => {
    this.role = 'operative';
    this.words = words;
    console.log(this.words);
  });
}
}
