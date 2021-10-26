import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { HandyNgUserService, HandyNgCoreService, HandyNgConfigService } from '@handy-ng/services';
import { UserRole, AdditionalAccessPermission, UserGroup } from '@handy-ng/types';

abstract class UserGuardHandler implements CanActivate, CanActivateChild {

  public abstract condition: UserGuardCondition;
  protected _userServise: HandyNgUserService;
  protected _configService: HandyNgConfigService;
  protected router: Router;

  constructor () {

    this._userServise = HandyNgCoreService.injector.get(HandyNgUserService);
    this._configService = HandyNgCoreService.injector.get(HandyNgConfigService);
    this.router = HandyNgCoreService.injector.get(Router);

  }

  protected _unloggedOnlyCheck(): true | UrlTree {

    if (this._userServise.loggedInStatus) {
      return this.router.parseUrl('/dashboard');
    }

    return true;

  }

  protected check(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {

    // ? Order matters
    if (!this.condition) {
      return true;
    }

    if (this.condition['notLoggedInOnly'] !== undefined) {
      return this._unloggedOnlyCheck();
    }

    // ? Forces profile finishing
    if (this._userServise.loggedInStatus && this._configService.data.userRegistration.multiStepRegistration && !this._userServise.userData.completeProfile && ((next.url[0] !== undefined && next.url[0].path !== 'complete-registration') || next.url[0] === undefined)) {
      return this.router.parseUrl('user/complete-registration');
    }

    // ? Super admin can do anything...
    if (this._userServise.hasRole('superAdmin')) {
      return true;
    }

    if (this.condition['fn'] !== undefined) {
      return this.condition['fn'](this._userServise, next, state, this.router);
    }

    if (!this._userServise.loggedInStatus) {
      return this.router.parseUrl('/login');
    }

    let allow: boolean = false;

    if (this.condition['roles'] !== undefined) {
      allow = this._userServise.hasRole(this.condition['roles']);
    }

    if (this.condition['permissions'] !== undefined) {
      allow = this._userServise.hasPermission(this.condition['permissions']);
    }

    if (this.condition['groups'] !== undefined) {
      allow = this._userServise.isMemberOfGrouptType(this.condition['groups']);
    }

    if (allow) {
      return true;
    } else {
      
      return this.router.parseUrl('/error?code=403');

    }

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree | Promise<true | UrlTree> {

      return new Promise((resolve, reject) => {

        this._userServise.onStateLoaded(() => {

          if (this.condition['fn'] !== undefined && typeof this.condition['fn'].then === 'function') {
            return this.condition['fn'](this._userServise, next, state, this.router);
          }

          resolve(this.check(next, state));
          return;

        })

      })

  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree | Promise<true | UrlTree> | Observable<true | UrlTree> {
    return this.canActivate(next, state);
  }

}

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanActivateChild {

  constructor (
    protected _userServise: HandyNgUserService,
    protected _configService: HandyNgConfigService,
    protected _router: Router) {
  }

  public static condition(condition: UserGuardCondition): any {

    @Injectable({
      providedIn: 'root',
    })
    class Guard extends UserGuardHandler {

      public condition = condition;

    }

    return Guard;

  }

  protected check(next: ActivatedRouteSnapshot): true | UrlTree {

    if (!this._userServise.loggedInStatus) {
      return this._router.parseUrl('/login');
    }

    // ? Forces profile finishing
    if (this._configService.data.userRegistration.multiStepRegistration && !this._userServise.userData.completeProfile && ((next.url[0] !== undefined && next.url[0].path !== 'complete-registration') || next.url[0] === undefined)) {
      return this._router.parseUrl('user/complete-registration');
    }

    // ? Super admin can do anything...
    if (this._userServise.hasRole('superAdmin')) {
      return true;
    }
    
    return true;

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree | Promise<true | UrlTree> | Observable<true | UrlTree> {

      return new Promise((resolve, reject) => {

        this._userServise.onStateLoaded(() => {
          
          resolve(this.check(next));
          return;

        })

      })

  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree | Promise<true | UrlTree> | Observable<true | UrlTree> {
    return this.canActivate(next, state);
  }

}

export type UserGuardCustomFn = (userServise?: HandyNgUserService, next?: ActivatedRouteSnapshot, state?: RouterStateSnapshot, router?: Router) => true | UrlTree | Promise<true | UrlTree>;
type UserGuardCondition = { roles: UserRole[] } | { permissions: AdditionalAccessPermission[] } | { groups: UserGroup[] } | { fn: UserGuardCustomFn } | { notLoggedInOnly: true };