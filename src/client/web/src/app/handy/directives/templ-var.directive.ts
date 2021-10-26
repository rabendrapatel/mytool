import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { DefaultTemplateVariableDirective } from '../core/defaults/directives/templ-var.directive'

interface LetContext<T> {
  templVar: T | null
}

@Directive({
  selector: '[templVar]',
  inputs: ['templVar']
})
export class TemplateVariableDirective<T> extends DefaultTemplateVariableDirective<T> {

  constructor (_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {

    super(_viewContainer, _templateRef);
  }

}
// Usage *templVar="value as varName"