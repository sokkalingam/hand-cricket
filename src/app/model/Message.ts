import { Player } from './Player';

export class Message {
  senderName: string;
  senderId: string;
  date: Date;
  message: string;

  constructor(player: Player, text: string) {
    this.date = new Date();
    this.senderName = player.name;
    this.senderId = player.id;
    this.message = text;
  }
}
