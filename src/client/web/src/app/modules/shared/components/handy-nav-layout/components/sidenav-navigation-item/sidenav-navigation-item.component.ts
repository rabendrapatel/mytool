import { HandyNgLayoutService } from '@handy-ng/services';
import { Component, Input, QueryList, ContentChildren, AfterContentInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NestedMenuStructure } from '@handy-ng/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidenav-nav-item',
  templateUrl: './sidenav-navigation-item.component.html',
  styleUrls: ['./sidenav-navigation-item.component.scss']
})
export class SidenavNavigationItemComponent implements AfterContentInit, OnDestroy {

  public _icon: string;
  public _text: string;
  public _link: string = 'defaultNonExistingLink';
  public _isSeparator: boolean = false;

  public _childrenVisible: boolean = false;
  public activeChildren: boolean = false;

  public _isChildren: boolean = false;
  public showAsActive: boolean = false;

  public parentData: ChildDataForParent;
  public initilized: boolean = false;
  protected _nestedMenuStructure: NestedMenuStructure;
  protected _navigationChangeSub: Subscription;

  @ContentChildren(SidenavNavigationItemComponent) children: QueryList<SidenavNavigationItemComponent>;

  @Input() set icon(itemIcon: string) {
    this._icon = itemIcon;
  }

  @Input() set text(itemText: string) {
    this._text = itemText;
  }

  @Input() set link(itemLink: string) {
    this._link = itemLink;
  }

  @Input() set separator(isSeparator: boolean) {
    this._isSeparator = isSeparator;
  }

  public get nestedMenuStructure(): NestedMenuStructure {

    return this.getNestedMenuStructure();

  }

  constructor (
    public handyNgLayoutService: HandyNgLayoutService,
    private _router: Router) {


    this._navigationChangeSub = this._router.events.subscribe((navigationEvent: Event) => {

      if (navigationEvent instanceof NavigationEnd && this.initilized) {
        this.updateActiveStatus();
      }

    })
    

  }

  ngAfterContentInit() {

    this.parentData = this.getDataForParent();
    this.getNestedMenuStructure();
    // this.updateActiveStatus();
    this.initilized = true;
    
  }

  public getDataForParent(): ChildDataForParent {

    let children = this.children.toArray();

    let result: ChildDataForParent = {
      icon: this._icon,
      text: this._text,
      link: this._link,
      
      hasChildren: children.length > 0,
      children: children,
      childrenData: [],
      isSeparator: this._isSeparator,
      childrenVisible: this._childrenVisible
    };

    if (result.hasChildren) {

      let childrenLen = result.children.length;
      for (let i = 0; i < childrenLen; i++) {

        const singleChild: SidenavNavigationItemComponent = children[i];

        let isActive = this._router.isActive(singleChild._link, true);

        if (isActive) {
          this._childrenVisible = true;
          this.activeChildren = true;
          this.showAsActive = true;
        }

        singleChild._isChildren = true;
        result.childrenData.push(singleChild.parentData);

      }

    }

    return result;

  }

  public handleClick(): void {

    if (this.parentData.hasChildren) {
      this._childrenVisible = !this._childrenVisible;
    } else {
      
      if (this.handyNgLayoutService.sidenavMode !== 'side') {
        this.handyNgLayoutService.toggleSidenav(false, false);
      }

    }

  }

  public getNestedMenuStructure(): NestedMenuStructure {

    if (this._nestedMenuStructure) {
      return this._nestedMenuStructure;
    }

    let { icon, text, link, hasChildren, isSeparator, children } = this.parentData;

    let result: NestedMenuStructure = {
      icon,
      text,
      link,
      hasChildren,
      isSeparator,
      children: []
    }

    if (hasChildren) {
      let childrenLen: number = children.length;

      for (let i = 0; i < childrenLen; i++) {
        const singleChild = children[i];
        result.children.push(singleChild.nestedMenuStructure)
      }

    }

    this._nestedMenuStructure = result;
    return result;

  }

  protected updateActiveStatus(): void {

    let active: boolean = this._router.isActive(this._link, true);

    if (this.parentData && this.parentData.hasChildren) {

      let childrenLen: number = this.parentData.children.length;

      for (let i = 0; i < childrenLen; i++) {
        const singleChild = this.parentData.children[i];

        if (this._router.isActive(singleChild._link, true)) {
          active = true;
        }

      }
    }

    this.activeChildren = active;
    this._childrenVisible = active;
    this.showAsActive = active;

  }

  ngOnDestroy(): void {
    this._navigationChangeSub.unsubscribe();
  }

}

interface ChildDataForParent {
  icon?: string,
  text?: string,
  link?: string,
  hasChildren: boolean,
  children?: SidenavNavigationItemComponent[],
  childrenData?: ChildDataForParent[],
  isSeparator?: boolean,
  childrenVisible?: boolean,
}