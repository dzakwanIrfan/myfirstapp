import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from '../services/message.service';
import { AlertController, ModalController } from '@ionic/angular';
import { MessageModalPage } from './message-modal/message-modal.page';

@Component({
  selector: 'app-folder',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Inbox</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="openAddModal()">
            <ion-icon slot="icon-only" name="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-list>
        <ion-item-sliding *ngFor="let message of messages">
          <ion-item>
            <ion-label>
              <h2>{{ message.subject }}</h2>
              <p>{{ message.content }}</p>
              <p>{{ message.date }}</p>
            </ion-label>
          </ion-item>

          <ion-item-options>
            <ion-item-option (click)="editMessage(message)">
              <ion-icon slot="icon-only" name="create"></ion-icon>
            </ion-item-option>
            <ion-item-option color="danger" (click)="deleteMessage(message.id)">
              <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  `
})
export class FolderPage implements OnInit {
  messages: Message[] = [];

  constructor(
    private messageService: MessageService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  private loadMessages() {
    this.messages = this.messageService.getMessages();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: MessageModalPage,
      componentProps: {
        message: null
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.messageService.addMessage(result.data);
        this.loadMessages();
      }
    });

    return await modal.present();
  }

  async editMessage(message: Message) {
    const modal = await this.modalCtrl.create({
      component: MessageModalPage,
      componentProps: {
        message: message
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.messageService.updateMessage({
          ...result.data,
          id: message.id
        });
        this.loadMessages();
      }
    });

    return await modal.present();
  }

  async deleteMessage(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus pesan ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.messageService.deleteMessage(id);
            this.loadMessages();
          }
        }
      ]
    });

    await alert.present();
  }
}