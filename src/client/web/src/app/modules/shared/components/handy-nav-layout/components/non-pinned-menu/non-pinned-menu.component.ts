import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NestedMenuStructure } from '@handy-ng/types';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandyNgLayoutService } from '@handy-ng/services';

@Component({
  selector: 'non-pinned-menu',
  templateUrl: './non-pinned-menu.component.html',
  styleUrls: ['./non-pinned-menu.component.scss']
})
export class NonPinnedMenuComponent implements OnInit, OnDestroy {

  public data: NestedMenuStructure;
  public isParent: boolean = false;
  public activeChildren: boolean = false;

  protected _navigationChangeSub: Subscription;

  @Input() set menuData(dataToUse: NestedMenuStructure) {
    this.data = dataToUse;
  }

  @Input() set parent(isParent: boolean) {
    this.isParent = isParent;
  }

  constructor (private _router: Router, public handyNgLayoutService: HandyNgLayoutService) {

    this._navigationChangeSub = this._router.events.subscribe((navigationEvent: Event) => {
      if (navigationEvent instanceof NavigationEnd) {
        this._updateActiveStatus();
      }
    })

  }

  ngOnInit(): void {

    this._updateActiveStatus();

  }

  protected _updateActiveStatus(): void {

    if (this.isParent) {

      let active: boolean = false

      let childrenLen: number = this.data.children.length;
      for (let i = 0; i < childrenLen; i++) {
        const singleChild = this.data.children[i];
        let hasActiveChild = this._router.isActive(singleChild.link, true);

        if (hasActiveChild) {
          active = true;
        }

      }

      this.activeChildren = active;

    }

  }

  public handleClick(): void {

    if (this.handyNgLayoutService.sidenavMode !== 'side') {
      this.handyNgLayoutService.toggleSidenav(false, false);
    }

  }

  ngOnDestroy(): void {
    this._navigationChangeSub.unsubscribe();
  }

}
