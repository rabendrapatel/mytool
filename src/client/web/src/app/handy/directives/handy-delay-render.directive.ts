import { AfterViewInit, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgConfigService } from '@handy-ng/services';

@Directive({
  selector: '[renderDelay]',
  exportAs: 'renderDelay'
})
export class HandyRenderDelayDirective implements AfterViewInit, OnDestroy {

  public isVisible: boolean;
  @Input('renderDelay') public renderDelay: number = 100;
  @Input('loadingTemplate') public loadingTemplate: TemplateRef<any>;

  @Input('minWidth') public minWidth: string = '40px';
  @Input('minHeight') public minHeight: string = '40px';
  
  constructor (
    private __viewContainer: ViewContainerRef,
    private __config: HandyNgConfigService,
    private __templateRef: TemplateRef<any>
  ) {

    if (this.__config.isPlatform('server')) {
      this.isVisible;
      this.__viewContainer.createEmbeddedView(this.__templateRef);
    }

  }

  ngAfterViewInit() {

    if (this.isVisible) {
      return;
    }

    let parentElm = this.__viewContainer.element.nativeElement.parentElement;
    this.setMinWidthHeight(parentElm);
    
    if (this.loadingTemplate) {

      this.__viewContainer.clear();
      if (this.loadingTemplate) {
        this.__viewContainer.createEmbeddedView(this.loadingTemplate);
      }

    }

    if (this.renderDelay > 0) {
      
      setTimeout(() => {
        this.render();
      }, this.renderDelay);

    }

  }

  public render(): void {

    if (this.isVisible) {
      return;
    }

    this.isVisible = true;
    this.__viewContainer.clear();
    this.__viewContainer.createEmbeddedView(this.__templateRef);

  }

  public setMinWidthHeight(el: any) {

    if (this.loadingTemplate || this.isVisible) {
      return;
    }

    let style = window.getComputedStyle(el);
    let [width, height] = [parseInt(style.width), parseInt(style.height)];

    el.style.minWidth = width ? width : this.minWidth;
    el.style.minHeight = height ? height : this.minHeight;

  }

  ngOnDestroy(): void {

    this.isVisible = true;

  }

}
// Manual trigger example
/* 
  <ng-template #loader>
    <h1>Loading</h1>
  </ng-template>
    
  <ng-template [renderDelay]="0" [loadingTemplate]="loader" #renderDelay="renderDelay">
    <test></test>
  </ng-template>
  <basic-btn (click)="renderDelay.render()" >Render</basic-btn>  
 */
