import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-action-button',
  templateUrl: './std-action-button.component.html',
  styleUrls: ['./std-action-button.component.css']
})
export class StdActionButtonComponent {
  @Output() action = new EventEmitter();

  onClick(): void {
    this.action.emit();
  }
}
