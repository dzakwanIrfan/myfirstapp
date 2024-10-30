# Panduan Menambahkan Komponen di Ionic Angular

## Cara Menambahkan Komponen di Halaman Ionic

### 1. Menggunakan Ionic CLI
Cara paling mudah untuk membuat komponen baru adalah menggunakan Ionic CLI:

```bash
# Format dasar
ionic generate component path/nama-komponen

# Contoh
ionic generate component pages/home/user-card
```

Perintah ini akan membuat:
- user-card.component.ts
- user-card.component.html
- user-card.component.scss
- user-card.component.spec.ts

### 2. Struktur Komponen
Setelah komponen dibuat, kita perlu memastikan struktur dasarnya benar:

```typescript
// user-card.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
```

### 3. Mendaftarkan Komponen di Module
Komponen harus didaftarkan di module yang sesuai:

```typescript
// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    UserCardComponent  // Daftarkan komponen di sini
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    UserCardComponent  // Export jika ingin digunakan di module lain
  ]
})
export class HomePageModule { }
```

### 4. Menggunakan Komponen
Setelah didaftarkan, komponen dapat digunakan di template:

```html
<!-- home.page.html -->
<ion-content>
  <app-user-card></app-user-card>
</ion-content>
```

### 5. Menambahkan Input dan Output
Untuk membuat komponen yang interaktif:

```typescript
// user-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ userName }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button (click)="onButtonClick()">
          {{ buttonText }}
        </ion-button>
      </ion-card-content>
    </ion-card>
  `
})
export class UserCardComponent {
  @Input() userName: string = '';
  @Input() buttonText: string = 'Click Me';
  @Output() buttonClicked = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClicked.emit();
  }
}
```

Penggunaan di halaman parent:
```html
<app-user-card
  [userName]="'John Doe'"
  [buttonText]="'View Profile'"
  (buttonClicked)="handleButtonClick()"
></app-user-card>
```

### 6. Menambahkan Ionic Components
Komponen dapat menggunakan komponen Ionic bawaan:

```typescript
@Component({
  selector: 'app-user-card',
  template: `
    <ion-card>
      <ion-item>
        <ion-avatar slot="start">
          <img [src]="userAvatar" />
        </ion-avatar>
        <ion-label>
          <h2>{{ userName }}</h2>
          <p>{{ userEmail }}</p>
        </ion-label>
      </ion-item>
      
      <ion-card-content>
        <ion-button expand="block" (click)="onButtonClick()">
          <ion-icon name="person" slot="start"></ion-icon>
          View Profile
        </ion-button>
      </ion-card-content>
    </ion-card>
  `
})
```

### 7. Lifecycle Hooks
Menambahkan lifecycle hooks untuk kontrol lebih baik:

```typescript
export class UserCardComponent implements OnInit, OnDestroy {
  ngOnInit() {
    // Inisialisasi komponen
    this.loadUserData();
  }

  ngOnDestroy() {
    // Cleanup saat komponen dihapus
    this.unsubscribeFromEvents();
  }
}
```

### 8. Styling Komponen
Menambahkan CSS khusus untuk komponen:

```scss
// user-card.component.scss
:host {
  display: block;
  margin: 16px;
  
  ion-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    ion-card-header {
      background: var(--ion-color-primary);
      color: white;
    }
    
    ion-button {
      margin-top: 16px;
    }
  }
}
```

## Screenshots
![Screenshot 2024-10-30 190219](https://github.com/user-attachments/assets/d52331c0-f059-449b-8c67-8f3ae6be2757)
![Screenshot 2024-10-30 190230](https://github.com/user-attachments/assets/d3bdc1f0-c0c4-41c3-a3ac-546229a186d9)
