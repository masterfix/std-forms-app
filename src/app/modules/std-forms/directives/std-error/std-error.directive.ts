import { Directive, Input, TemplateRef } from '@angular/core';

// tslint:disable-next-line: directive-selector
@Directive({ selector: 'ng-template[std-error]' })
export class StdErrorDirective {

  // tslint:disable-next-line: no-input-rename
  @Input('std-error') key: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
