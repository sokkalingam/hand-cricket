import { Component, Input } from '@angular/core';

import { Message } from '../../../model/Message';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})

export class ChatComponent {

  @Input() player: Player;
  messages: Message[] = [];
  text: string = '';
  chatConnected: boolean;

  chatSubsription: any;

  constructor(private socketService: SocketService,
              private gameService: GameService) { }

  composeMessage(text: string): Message {
    return new Message(this.player, text);
  }

  send(): void {
    if (!this.text.trim()) return;
    this.socketService.sendChatMessage(this.gameService.getGame().id, this.composeMessage(this.text));
    this.text = '';
  }

  connectToChat(): void {
    if (this.chatSubsription) return;
    this.chatSubsription = this.socketService.subscribetoChat(this.gameService.getGame().id, this.messages, this.scrollToBottom);
    this.socketService.connectChat(this.gameService.getGame().id, this.composeMessage(''));
    this.chatConnected = true;
  }

  disconnectToChat(): void {
    if (!this.chatSubsription) return;
    this.socketService.disconnectChat(this.gameService.getGame().id, this.composeMessage(''));
    this.chatSubsription.unsubscribe();
    this.chatSubsription = undefined;
    this.chatConnected = false;
  }

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

  scrollToBottom(lastMessage: Message): void {
    var lastMessageElement = document.getElementById(lastMessage.date.toString());
    console.log(lastMessageElement);
    lastMessageElement.scrollIntoView();
  }
}
