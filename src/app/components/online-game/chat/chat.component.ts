import { Component, Input } from '@angular/core';

import { Message } from '../../../model/Message';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';

import * as _ from 'lodash';

@Component({
  selector: 'chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})

export class ChatComponent {

  player: Player;
  messages: Message[] = [];
  text: string = '';
  chatConnected: boolean;

  chatSubsription: any;

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private playerService: PlayerService) {
    this.player = playerService.getCurrentPlayer();
    this.socketService.subscribetoChat(this.messages, this.scrollDown);
    this.socketService.connectChat(this.composeMessage(''));
  }

  composeMessage(text: string): Message {
    return new Message(this.player, text);
  }

  send(): void {
    if (!this.text.trim()) return;
    this.socketService.sendChatMessage(this.composeMessage(this.text));
    this.text = '';
  }

  // connectToChat(): void {
  //   if (this.chatSubsription) return;
  //   this.chatSubsription = this.socketService.subscribetoChat(this.messages);
  //   this.socketService.connectChat(this.composeMessage(''));
  //   this.chatConnected = true;
  // }
  //
  // disconnectToChat(): void {
  //   if (!this.chatSubsription) return;
  //   this.socketService.disconnectChat(this.composeMessage(''));
  //   this.chatSubsription.unsubscribe();
  //   this.chatSubsription = undefined;
  //   this.chatConnected = false;
  // }

  isChatConnected(): boolean { return this.chatSubsription != undefined; }

  fromHost(message: Message): boolean {
    return this.player.id == message.senderId;
  }

  fromChatBot(message: Message): boolean {
    return message.senderId == 'CHATBOT';
  }

  fromGuest(message: Message): boolean {
    return !this.fromHost(message) && !this.fromChatBot(message);
  }

  scrollDown(messages: Message[]): void {
    var messageElement = document.getElementById(_.last(messages).date.toString());
    console.log(messageElement);
    messageElement.scrollIntoView();
  }
}
