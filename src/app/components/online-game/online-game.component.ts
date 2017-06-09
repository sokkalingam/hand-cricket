import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../../model/Player';
import { PlayerType } from '../../enum/PlayerType';

var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html'
})

export class OnlineGameComponent implements OnInit {
  player: Player;

  stompClient: any;
  name: string = '';
  messages: string[] = [];

  ngOnInit(): void {
    this.player = new Player(PlayerType.User);
    this.connect();
  }

  send(): void {
    this.stompClient.send(`/app/game/ABCDE/${this.player.id}`, {}, JSON.stringify({ 'name': this.name }));
    this.name = '';
  }

  connect(): void {
    var that = this;
    var socket = new SockJS('http://localhost:8080/socket-registration');
    this.stompClient = Stomp.over(socket);
    console.log('StompClient: ' + JSON.stringify(this.stompClient));
    this.stompClient.connect({}, function (frame: any) {
        console.log('Connected: ' + frame);
        that.stompClient.subscribe(`/live-updates/ABCDE/${that.player.id}`, function (greeting: any) {
            console.log('Received Greeting: ' + JSON.stringify(greeting));
            that.messages.push(greeting.body);
        });
        that.stompClient.subscribe(`/live-updates/ABCDE`, function (greeting: any) {
            console.log('Received Greeting: ' + JSON.stringify(greeting));
            that.messages.push(greeting.body);
        });
    }, function (err: any) {
        console.log('Error Is: ', err);
    });
 }

 disconnect(): void {
    this.stompClient.disconnect();
    console.log("Disconnected");
}
}
