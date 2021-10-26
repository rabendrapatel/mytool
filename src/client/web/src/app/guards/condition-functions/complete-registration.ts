import { HandyNgUserService } from '@handy-ng/services';
import { UserGuardCustomFn } from '../user.guard';
import { UrlTree, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';

export const CompletRegistrationGuardCondition: UserGuardCustomFn = (userService: HandyNgUserService, next: ActivatedRouteSnapshot, state: RouterStateSnapshot, router: Router): true | UrlTree => {

  let { completeProfile } = userService.userData;

  if (!completeProfile) {
    return true;
  }

  return router.parseUrl('/error?code=403');

}