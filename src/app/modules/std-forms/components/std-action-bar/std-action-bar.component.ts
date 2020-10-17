import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-action-bar',
  templateUrl: './std-action-bar.component.html',
  styleUrls: ['./std-action-bar.component.css'],
})
export class StdActionBarComponent {

  constructor(private controlContainer: ControlContainer, private stdForm: StdFormComponent) {}

}
