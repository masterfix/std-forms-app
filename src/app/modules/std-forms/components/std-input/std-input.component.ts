import {
  AfterViewInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { StdErrorDirective } from '../../directives/std-error/std-error.directive';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-input',
  templateUrl: './std-input.component.html',
  styleUrls: ['./std-input.component.css']
})
export class StdInputComponent implements AfterViewInit, ControlValueAccessor {
  @Input() label: string;

  @Input() debug: boolean;

  @ContentChildren(StdErrorDirective) stdErrors: QueryList<StdErrorDirective>;

  formControl: FormControl;

  onChange: (value: any) => void;
  onTouch: () => void;

  constructor(private ngControl: NgControl, private stdForm: StdFormComponent) {
    this.ngControl.valueAccessor = this;
    this.formControl = new FormControl();
  }

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  get mergedDebug(): boolean {
    return this.debug !== undefined ? !!this.debug : !!this.stdForm.debug;
  }

  onBlur(): void {
    this.onTouch();
  }

  writeValue(value: any): void {
    console.log(`input '${this.label}' got new value:`, value);
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  @HostBinding('class.invalid')
  get invalid(): boolean {
    return this.ngControl.touched && this.ngControl.invalid;
  }

  get pending(): boolean {
    return this.ngControl.touched && this.ngControl.status === 'PENDING';
  }
}
