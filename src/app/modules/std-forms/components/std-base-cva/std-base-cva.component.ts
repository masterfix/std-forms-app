import { AfterViewInit, Component, ContentChildren,  forwardRef, Input, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControl,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { StdErrorDirective } from '../../directives/std-error/std-error.directive';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  template: '',
})
export abstract class StdBaseCvaComponent implements AfterViewInit, ControlValueAccessor {

  @Input('formControl') formControl: FormControl;

  @Input() label: string;

  @Input() debug: boolean;

  @ContentChildren(StdErrorDirective) stdErrors: QueryList<StdErrorDirective>;

  onChange: (value: any) => void;
  onTouch: () => void;

  constructor(private stdForm: StdFormComponent) {}

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  get mergedDebug(): boolean {
    return this.debug !== undefined ? !!this.debug : !!this.stdForm.debug;
  }

  get invalid(): boolean {
    return this.formControl.touched && this.formControl.invalid;
  }

  get pending(): boolean {
    return this.formControl.touched && this.formControl.status === 'PENDING';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  abstract writeValue(value: any): void;

  abstract setDisabledState?(isDisabled: boolean): void;

}

