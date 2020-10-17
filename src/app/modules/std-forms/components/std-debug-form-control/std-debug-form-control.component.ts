import { Component, HostBinding } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-debug-form-control',
  templateUrl: './std-debug-form-control.component.html',
  styleUrls: ['./std-debug-form-control.component.css'],
})
export class StdDebugFormControlComponent {

  constructor(private ngControl: NgControl) { }

  get formControl(): AbstractControl {
    return this.ngControl.control;
  }

  @HostBinding('class.invalid')
  get invalid(): boolean {
    return this.ngControl.control.invalid;
  }

}
