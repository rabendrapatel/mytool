import { DefaultHandyUserService } from "@handy/core/defaults/services/handy-user/handy-user";
import { Service } from "@handy/core";
import { UserModelInterfaces } from "@models";

@Service({
  routable: true,
  singleton: true
})
export class HandyUserService extends DefaultHandyUserService {

  constructor() {
    super();
  }

  /**
   * Handles default data for user generation
   *
   * @param {UserModelInterfaces['createShape']} postedUserData
   * @returns {UserModelInterfaces['createShape']}
   * @memberof HandyUserService
   */
  public generateDefaultUserOnRegistration(postedUserData: UserModelInterfaces['createShape']): UserModelInterfaces['createShape'] {

    if (isEmpty(postedUserData.roles)) {
      postedUserData.roles = this._defaultUserRole;
    }

    if (isEmpty(postedUserData.permissions)) {
      postedUserData.permissions = this.getDefaultPersmissionsForRoles(postedUserData.roles);
    }

    if (!postedUserData.hasVerifiedEmail && this._handyConfigService.get().userRegistration.verifyEmail) {

      postedUserData.emailVerificationHash = this._handyUtilsService.generateHash({ length: 10, specialChars: false, emptySpace: false });

    }

    if (!postedUserData.password) {

      postedUserData.password = this._handyUtilsService.generateStrongPassword();

    }

    return postedUserData;

  }

}