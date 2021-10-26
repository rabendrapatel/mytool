import { HandyNgLayoutService } from '@handy-ng/services';
import { OnInit, OnDestroy, TemplateRef, ViewContainerRef, Input, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class DefaultBreakpointsOnlyDirective implements OnInit, OnDestroy {

  protected breakpointChange: Subscription;
  protected hasElement: boolean = false;

  protected allowedViewPorts: ViewPortShortcuts[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  protected visibleViewPortAccessors: ViewPortAccessors[] = [];

  protected viewPortsDictionary: { [key in ViewPortShortcuts]?: ViewPortAccessors } = {
    xs: 'XSmall',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'XLarge'
  }

  @Input() set viewPorts(viewPortsToAllow: ViewPortShortcuts | ViewPortShortcuts[]) {

    let viewPortsToSet: ViewPortShortcuts[] = (Array.isArray(viewPortsToAllow)) ? viewPortsToAllow : [viewPortsToAllow];
    let viewPortsToSetLen: number = viewPortsToSet.length;

    let tempViewPortsHolder: ViewPortAccessors[] = [];

    for (let i = 0; i < viewPortsToSetLen; i++) {
      const singleViewPort = viewPortsToSet[i];
      
      if (this.allowedViewPorts.includes(singleViewPort)) {
        tempViewPortsHolder.push(this.viewPortsDictionary[singleViewPort]);
      }

    }

    this.visibleViewPortAccessors = tempViewPortsHolder;

    this.changeVisibility();

  }

  constructor (protected _handyNgLayout: HandyNgLayoutService, protected templateRef: TemplateRef<any>, protected vCref: ViewContainerRef) { }

  ngOnInit() {

    this.changeVisibility();
    this.breakpointChange = this._handyNgLayout.breakPointChange.subscribe(change => {
      this.changeVisibility();
    })

  }

  protected changeVisibility(): void {

    let hasMatch: boolean = false;

    let visibleAccessorsLen: number = this.visibleViewPortAccessors.length;
    for (let i = 0; i < visibleAccessorsLen; i++) {
      const singleAccessor = this.visibleViewPortAccessors[i];
      
      if (this._handyNgLayout[`is${singleAccessor}`]) {
        hasMatch = true;
        break;  
      }

    }

    if (hasMatch && !this.hasElement) {
      this.hasElement = true;
      this.vCref.createEmbeddedView(this.templateRef);
      return;
    }

    if (!hasMatch && this.hasElement) {
      this.hasElement = false;
      this.vCref.createEmbeddedView(this.templateRef);
      this.vCref.clear();
      return;
    }

  }

  ngOnDestroy() {

    if (this.breakpointChange) {
      this.breakpointChange.unsubscribe()
    }

  }

}

type ViewPortAccessors = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
type ViewPortShortcuts = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
