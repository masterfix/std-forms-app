import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StdFormComponent } from './components/std-form/std-form.component';
import { StdInputComponent } from './components/std-input/std-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StdErrorComponent } from './components/std-error/std-error.component';
import { StdErrorDirective } from './directives/std-error/std-error.directive';
import { StdLabelComponent } from './components/std-label/std-label.component';
import { StdRadiobuttonGroupComponent } from './components/std-radiobutton-group/std-radiobutton-group.component';
import { StdDebugFormControlComponent } from './components/std-debug-form-control/std-debug-form-control.component';
import { StdRadiobuttonDirective } from './directives/std-radiobutton/std-radiobutton.directive';
import { StdDebugFormGroupComponent } from './components/std-debug-form-group/std-debug-form-group.component';
import { StdActionBarComponent } from './components/std-action-bar/std-action-bar.component';
import { StdActionButtonComponent } from './components/std-action-button/std-action-button.component';
import { StdSaveButtonComponent } from './components/std-save-button/std-save-button.component';

@NgModule({
  declarations: [
    StdFormComponent,
    StdErrorDirective,
    StdErrorComponent,
    StdDebugFormControlComponent,
    StdDebugFormGroupComponent,
    StdLabelComponent,
    StdInputComponent,
    StdRadiobuttonGroupComponent,
    StdRadiobuttonDirective,
    StdActionBarComponent,
    StdActionButtonComponent,
    StdSaveButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    StdFormComponent,
    StdErrorDirective,
    StdErrorComponent,
    StdInputComponent,
    StdRadiobuttonGroupComponent,
    StdRadiobuttonDirective,
    StdActionBarComponent,
    StdActionButtonComponent,
    StdSaveButtonComponent,
  ],
})
export class StdFormsModule { }
