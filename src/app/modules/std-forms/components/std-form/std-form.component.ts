import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList
} from '@angular/core';
import {
  ControlContainer,
  FormControlDirective,
} from '@angular/forms';
import { StdErrorDirective } from '../../directives/std-error/std-error.directive';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.css']
})
export class StdFormComponent {
  @Input() debug = false;

  @ContentChildren(StdErrorDirective) stdErrors: QueryList<StdErrorDirective>;
  @ContentChildren(FormControlDirective, { descendants: true }) formControls: QueryList<FormControlDirective>;
  @ContentChildren(FormControlDirective, {
    descendants: true,
    read: ElementRef
  })
  formControlsElementRefs: QueryList<ElementRef<FormControlDirective>>;

  constructor(private controlContainer: ControlContainer) {
    // this.controlContainer.
  }

  scrollToFirstInvalidControl(): void {
    console.log('found formControls:', this.formControls.length);
    console.log(
      'found formControlsElementRefs:',
      this.formControlsElementRefs.length
    );

    let invalidIndex = -1;
    this.formControls.find((formControl, index, formControls) => {
      if (!formControl.valid) {
        invalidIndex = index;
        return true;
      }
      return false;
    });

    if (invalidIndex >= 0) {
      console.log('found an invalid control at position:', invalidIndex);

      const invalidElement = this.formControlsElementRefs.toArray()[
        invalidIndex
      ].nativeElement as any;

      // console.log("invalid element:", invalidElement);

      const rect = invalidElement.getBoundingClientRect();
      // console.log(rect.top, rect.right, rect.bottom, rect.left);

      console.log('scrolling to top:', rect.top, 'left:', rect.left);

      window.scrollTo({
        top: rect.top,
        left: rect.left
      });

      // console.log('scroll to:', invalidFormControl.);
    }

    /*if (this.controlContainer.control instanceof FormGroup) {
      for (const controlName in this.controlContainer.control.controls) {
        console.log("controlName:", controlName);
        const control = this.controlContainer.control.controls[controlName];
        console.log("control:", control);
      }
    } else if (this.controlContainer.control instanceof FormArray) {
      console.log("controlContainer is a FormArray");
    } else {
      console.log("controlContainer is of unknown type");
    }*/
  }
}
