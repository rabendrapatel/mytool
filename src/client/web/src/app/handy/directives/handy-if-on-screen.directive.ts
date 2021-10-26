import { AfterViewInit, Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { HandyNgConfigService } from '@handy-ng/services';

@Directive({
  selector: '[ifOnScreen]',
})
export class HandyIfOnScreenDirective implements AfterViewInit, OnDestroy {

  public isVisible: boolean;
  private __observer: IntersectionObserver;

  @Input('minWidth') public minWidth: string = '40px';
  @Input('minHeight') public minHeight: string = '40px';
  @Input('hideOnViewportLeave') public hideOnViewportLeave: boolean = false;

  @Input('loadingTemplate') public loadingTemplate: TemplateRef<any>;

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

    if (this.loadingTemplate) {

      this.__viewContainer.clear();
      this.__viewContainer.createEmbeddedView(this.loadingTemplate);

    }

    let parentElm = this.__viewContainer.element.nativeElement.parentElement;
    this.setMinWidthHeight(parentElm);

    this.__observer = new IntersectionObserver(entries => {

      let entriesLen: number = entries.length;
      for (let i = 0; i < entriesLen; i++) {
        this.renderContents(entries[i].isIntersecting);        
      }

    }, { threshold: 0 });

    this.__observer.observe(parentElm);

  }

  renderContents(isInView: boolean) {

    if (!this.hideOnViewportLeave) {
      
      if (isInView && !this.isVisible) {
  
        this.__viewContainer.clear();
        this.__viewContainer.createEmbeddedView(this.__templateRef);
        this.isVisible = true;
  
        if (this.__observer) {
          this.__observer.disconnect();
        }
  
      }

      return;

    } 

    if (isInView && !this.isVisible) {

      this.__viewContainer.clear();
      this.__viewContainer.createEmbeddedView(this.__templateRef);
      this.isVisible = true;
      
    }
    
    if (!isInView && this.isVisible) {
      
      this.__viewContainer.clear();
      
      if (this.loadingTemplate) {
        this.__viewContainer.createEmbeddedView(this.loadingTemplate);
      }

      this.isVisible = false;

    }

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

    if (this.__observer) {
      this.__observer.disconnect();
    }

  }

}

