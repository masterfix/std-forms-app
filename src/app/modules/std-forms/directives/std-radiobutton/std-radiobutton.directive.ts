import { Directive, Input, TemplateRef } from '@angular/core';

// tslint:disable-next-line: directive-selector
@Directive({ selector: 'ng-template[std-radiobutton]' })
export class StdRadiobuttonDirective {

  // tslint:disable-next-line: no-input-rename
  @Input('std-radiobutton') value: any;

  constructor(public templateRef: TemplateRef<any>) { }
}
