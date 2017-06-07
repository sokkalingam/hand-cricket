import { Component, OnInit } from '@angular/core';

var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html'
})

export class OnlineGameComponent implements OnInit {
  stompClient: any;
  name: string = '';
  messages: string[] = [];

  ngOnInit(): void {
    this.connect();
  }

  send(): void {
    this.stompClient.send('/app/hello', {}, JSON.stringify({ 'name': this.name }));
    this.name = '';
  }

  connect(): void {
    var that = this;
    var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    this.stompClient = Stomp.over(socket);
    console.log('StompClient: ' + JSON.stringify(this.stompClient));
    this.stompClient.connect({}, function (frame: any) {
        console.log('Connected: ' + frame);
        that.stompClient.subscribe('/topic/greetings/GAME', function (greeting: any) {
            console.log('Received Greeting: ' + JSON.stringify(greeting));
            that.messages.push(JSON.parse(greeting.body).content);
        });
        that.stompClient.subscribe('/topic/greetings/USER', function (greeting: any) {
            console.log('Received Greeting: ' + JSON.stringify(greeting));
            that.messages.push(JSON.parse(greeting.body).content);
        });
        that.stompClient.subscribe('/topic/greetings/COMP', function (greeting: any) {
            console.log('Received Greeting: ' + JSON.stringify(greeting));
            that.messages.push(JSON.parse(greeting.body).content);
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
