import { Injectable } from '@angular/core';

export interface Message {
  id: number;
  subject: string;
  content: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [
    {
      id: 1,
      subject: 'New Project',
      content: 'Meeting untuk project baru besok.',
      date: '2024-10-30'
    }
  ];

  constructor() { }

  getMessages(): Message[] {
    return this.messages;
  }

  getMessage(id: number): Message | undefined {
    return this.messages.find(m => m.id === id);
  }

  addMessage(message: Omit<Message, 'id'>): void {
    const newId = this.messages.length > 0 ? 
      Math.max(...this.messages.map(m => m.id)) + 1 : 1;
    
    this.messages.push({
      id: newId,
      ...message
    });
  }

  updateMessage(message: Message): void {
    const index = this.messages.findIndex(m => m.id === message.id);
    if (index !== -1) {
      this.messages[index] = message;
    }
  }

  deleteMessage(id: number): void {
    const index = this.messages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}