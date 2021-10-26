import { HandyNgUserService } from '@handy-ng/services';
import { UserGuardCustomFn } from '../user.guard';
import { UrlTree, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';

export const HomePageGuardCondition: UserGuardCustomFn = (userService: HandyNgUserService, next: ActivatedRouteSnapshot, state: RouterStateSnapshot, router: Router): true | UrlTree => {

  if (userService.loggedInStatus) {
    return router.parseUrl('/dashboard');
  }

  return true;

}