import { DefaultHandyUserService } from "@handy/core/defaults/services/handy-user/handy-user";
import { UserModelInterfaces } from "@models";
export declare class HandyUserService extends DefaultHandyUserService {
    constructor();
    /**
     * Handles default data for user generation
     *
     * @param {UserModelInterfaces['createShape']} postedUserData
     * @returns {UserModelInterfaces['createShape']}
     * @memberof HandyUserService
     */
    generateDefaultUserOnRegistration(postedUserData: UserModelInterfaces['createShape']): UserModelInterfaces['createShape'];
}
