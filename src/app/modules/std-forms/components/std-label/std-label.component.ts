import { Component } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-label',
  templateUrl: './std-label.component.html',
  styleUrls: ['./std-label.component.css']
})
export class StdLabelComponent {
  constructor(private ngControl: NgControl) {}

  get required(): boolean {
    if (!this.ngControl.control) {
      return false;
    }

    if (this.ngControl.control.validator) {
      // hack to find out if the 'required' validator is in use
      // attention: this calls every synchronus validator!
      const validationResult = this.ngControl.control.validator(
        {} as AbstractControl
      );
      if (validationResult && validationResult.required) {
        return true;
      }
    }

    return false;
  }
}
