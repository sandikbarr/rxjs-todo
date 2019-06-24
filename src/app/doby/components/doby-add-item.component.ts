import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-doby-add-item',
  template: `
    <input #doby (change)="onAddDoby(doby.value)"/>
    <button (click)="onAddDoby(doby.value)">Add</button>
  `
})
export class DobyAddItemComponent {
  @Output() addDoby = new EventEmitter();
  @ViewChild('doby') input: ElementRef;

  onAddDoby(description) {
    this.addDoby.emit({description});
    this.input.nativeElement.value = '';
  }
}
