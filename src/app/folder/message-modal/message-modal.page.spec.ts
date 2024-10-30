import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageModalPage } from './message-modal.page';

describe('MessageModalPage', () => {
  let component: MessageModalPage;
  let fixture: ComponentFixture<MessageModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
