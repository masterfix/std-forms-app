import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-save-button',
  templateUrl: './std-save-button.component.html',
  styleUrls: ['./std-save-button.component.css']
})
export class StdSaveButtonComponent {

  @Input() disabled: boolean;

  @Output() action = new EventEmitter();
  @Output() save = new EventEmitter<SaveEvent>();

  private forceDisable = false;

  constructor(
    private controlContainer: ControlContainer,
    private stdForm: StdFormComponent,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  get formControl(): AbstractControl {
    return this.controlContainer.control;
  }

  get mergedDisabled(): boolean {
    if (this.disabled !== undefined && this.disabled) {
      return true;
    }
    return this.forceDisable;
  }

  onAction(): void {
    this.forceDisable = true;

    this.action.emit();
    this.formControl.markAllAsTouched();

    of(this.formControl.status).pipe(
      switchMap(status => {
        if (status !== 'PENDING') {
          return of(status);
        }
        return this.formControl.statusChanges.pipe(
          distinctUntilChanged(),
        );
      }),
      take(1),
    ).subscribe(() => {

      this.stdForm.scrollToFirstInvalidControl();

      this.save.emit({
        formValid: this.formControl.valid,
        formValue: this.formControl.value,
        finishSave: () => this.forceDisable = false,
      });

    });
  }

}

export interface SaveEvent {
  formValid: boolean;
  formValue: any;
  finishSave(): void;
}
