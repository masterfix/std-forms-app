import { Component, HostBinding } from '@angular/core';
import { AbstractControl, FormControl, FormArray, FormGroup, NgControl, ControlContainer } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-debug-form-group',
  templateUrl: './std-debug-form-group.component.html',
  styleUrls: ['./std-debug-form-group.component.css'],
})
export class StdDebugFormGroupComponent {

  constructor(private controlContainer: ControlContainer) { }

  get formControl(): AbstractControl {
    return this.controlContainer.control;
  }

  get errors(): any {
    return this.getErrorsFromControl(this.formControl);
  }

  @HostBinding('class.invalid')
  get invalid(): boolean {
    return this.controlContainer.control.invalid;
  }

  private getErrorsFromControl(control: AbstractControl): any {

    if (control instanceof FormControl) {
      // console.log(control.errors);
      if (control.errors) {
        return control.errors;
      }
      return null;
    } else if (control instanceof FormGroup || control instanceof FormArray) {

      const errors = {};
      Object.keys(control.controls).forEach(key => {
        const childControl = control.controls[key];
        const childErrors = this.getErrorsFromControl(childControl);
        if (childErrors) {
          errors[key] = childErrors;
        }
      });
      return errors;

    }

  }

}
