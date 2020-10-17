import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from './app-validators';
import { SaveEvent } from './modules/std-forms/components/std-save-button/std-save-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  public static firstNameField = 'firstName';
  public static lastNameField = 'lastName';
  public static emailField = 'email';
  public static genderField = 'gender';

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup(
      {
        [AppComponent.firstNameField]: new FormControl('Jo', {
          validators: [
            Validators.required,
            Validators.minLength(3)
            // AppValidators.startsWithCapitalLetter
          ]
        }),
        [AppComponent.lastNameField]: new FormControl('doe', {
          validators: [AppValidators.startsWithCapitalLetter]
        }),
        [AppComponent.genderField]: new FormControl('male', {
          validators: [Validators.required]
        }),
        [AppComponent.emailField]: new FormControl('john@doe.com', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [AppValidators.uniqueEmail]
        })
      },
      { updateOn: 'blur' }
    );
    this.form.valueChanges.subscribe(change => {
      console.log('form value change:', change);
    });
    this.form.statusChanges.subscribe(change => {
      console.log('form status change:', change);
    });
  }

  onSaveAction(): void {
    console.log('save clicked');
  }

  onSave(event: SaveEvent): void {
    console.log('received save event:', event);
  }

  onCancelAction(): void {
    console.log('cancel clicked');
  }

  get firstName(): FormControl {
    return this.form.get(AppComponent.firstNameField) as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get(AppComponent.lastNameField) as FormControl;
  }

  get email(): FormControl {
    return this.form.get(AppComponent.emailField) as FormControl;
  }

  get gender(): FormControl {
    return this.form.get(AppComponent.genderField) as FormControl;
  }
}
