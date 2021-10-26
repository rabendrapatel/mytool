import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

interface LetContext<T> {
  templVar: T | null
}

@Directive()
export class DefaultTemplateVariableDirective<T> {
  protected _context: LetContext<T> = { templVar: null }

  constructor (_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
    _viewContainer.createEmbeddedView(_templateRef, this._context)
  }

  @Input()
  set templVar(value: T) {
    this._context.templVar = value
  }

}
