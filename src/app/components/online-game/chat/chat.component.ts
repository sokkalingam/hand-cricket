import { Component, Input } from '@angular/core';

import { Message } from '../../../model/Message';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'chat',
  templateUrl: 'chat.component.html'
})

export class ChatComponent {

  @Input() game: Game;
  @Input() player: Player;
  messages: Message[] = [];
  text: string;
  chatConnected: boolean;

  constructor(private socketService: SocketService) { }

  composeMessage(text: string): Message {
    return new Message(this.player, text);
  }

  send(): void {
    var message = this.composeMessage(this.text);
    this.socketService.sendMessage(this.game.id, message);
    this.text = '';
  }

  connectToChat(): void {
    this.socketService.subscribetoChat(this.game.id, this.messages);
    this.chatConnected = true;
  }

}
