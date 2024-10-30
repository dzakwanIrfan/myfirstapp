import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Message } from '../../services/message.service';

@Component({
  selector: 'app-message-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ message ? 'Edit Pesan' : 'Pesan Baru' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Batal</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Subjek</ion-label>
          <ion-input [(ngModel)]="subject" placeholder="Masukkan subjek"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Konten</ion-label>
          <ion-textarea
            [(ngModel)]="content"
            placeholder="Masukkan konten pesan"
            rows="4"
          ></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Tanggal</ion-label>
          <ion-datetime
            [(ngModel)]="date"
            display-format="YYYY-MM-DD"
          ></ion-datetime>
        </ion-item>
      </ion-list>

      <ion-button expand="block" (click)="save()" [disabled]="!isValid">
        Simpan
      </ion-button>
    </ion-content>
  `
})
export class MessageModalPage implements OnInit {
  @Input() message?: Message;
  subject: string = '';
  content: string = '';
  date: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.message) {
      this.subject = this.message.subject;
      this.content = this.message.content;
      this.date = this.message.date;
    }
  }

  get isValid(): boolean {
    return this.subject.trim() !== '' && this.content.trim() !== '';
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.isValid) {
      this.modalCtrl.dismiss({
        subject: this.subject,
        content: this.content,
        date: this.date
      });
    }
  }
}