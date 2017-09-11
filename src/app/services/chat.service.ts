import { Component, Injectable } from '@angular/core';

import { Message } from '../model/Message';
import * as _ from 'lodash';

@Injectable()
export class ChatService {
  showChat: boolean = false;
  newMessages: number = 0;
  messages: Message[] = [];

  openChat(): void {
    this.showChat = true;
    this.newMessages = 0;
    this.scrollDown();
  }

  countMessage(): void {
    if (!this.showChat)
      this.newMessages++;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  clearMessages(): void {
    this.messages = [];
  }

  scrollDown(): void {
    var that = this;
    setTimeout(() => {
      if (that.messages.length == 0) return;
      var messageElement = document.getElementById(_.last(that.messages).date.toString());
      messageElement.scrollIntoView();
    }, 50);
  }
}
