import { HandyConfigService, HandyUtilsService, HandySocketEmitter } from '@services';
import { HandyModelClass } from '@models';
import { MongooseModel, MongooseMW, Inject, GetRequest, CronInterval } from "@handy/core";
import { UserModelDeclaration } from './model.declaration'
import { UserModelInterfaces } from "./model.interface";

import { HandyUserService } from '@services';
import { ServerRequest, ServerResponse, ServerRequestUser } from '@handy/types';

@MongooseModel<UserModelInterfaces>({
  name: 'User',
  modelDeclaration: UserModelDeclaration,
  accessRules: {
    // create: {
    //   permission: 'loggedIn'
    // },
    // read: {
    //   groupIdField: 'groupId'
    // },
    // update: {
    //   permission: ['admin'],
    //   userIdField: '_id',
    //   groupIdField: 'groupId'
    // },
    // delete: {
    //   permission: ['admin']
    // }
  },
  softDelete: true,
  createdAt: true,
  createdBy: true,
  changesHistory: true,
  autoIncrement: true,
  defaultSelect: {
    selectType: 'deselect',
    fields: ['password']
  }
})
export class UserModel extends HandyModelClass<UserModelInterfaces> {

  protected _handyUserService: HandyUserService = Inject(HandyUserService);
  protected _handyConfigService: HandyConfigService = Inject(HandyConfigService);
  protected _handyUtilsService: HandyUtilsService = Inject(HandyUtilsService);
  protected _handySocketEmitter: HandySocketEmitter = Inject(HandySocketEmitter);

  constructor () {
    super();

  }

  /* -------------------------------------------------------------------------- */
  /*                                 Middlewares                                */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Order matters ----------------------------- */

  @MongooseMW('save')
  protected _asignDefaultUserValues(mwThis: any, restArgs: any[]): Promise<void> {

    return new Promise((resolve, reject) => {

      mwThis = this._handyUserService.generateDefaultUserOnRegistration(mwThis);
      resolve();

    })

  }

  @MongooseMW('save')
  @MongooseMW('updateOne')
  @MongooseMW('updateMany')
  protected _hashUserPasswordMW(mwThis: any, restArgs: any[]): Promise<void> {

    let isUpdate: boolean = isNotNullOrUndefined(mwThis._update);
    let isDirectUpdate: boolean = true;
    let passVal: string;

    if (isUpdate) {

      if (isNotEmpty(mwThis._update.password)) {
        passVal = mwThis._update.password;
      }

      if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.password)) {
        passVal = mwThis._update.$set.password;
        isDirectUpdate = false;
      }

    } else {
      passVal = mwThis.password;
    }

    if (!passVal || passVal.endsWith(this._handyUserService.getPasswordSufix())) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {

      this._handyUserService.hashPassword(passVal)
        .then(hashedPass => {

          if (isUpdate) {

            if (isDirectUpdate) {
              mwThis._update.password = hashedPass;
            } else {
              mwThis._update.$set.password = hashedPass;
            }

          } else {
            mwThis.password = hashedPass;
          }

          return resolve();

        })
        .catch(err => {

          return reject(err);

        })

    })

  }

  @MongooseMW('updateOne')
  protected _handleEmailChange(mwThis: any, restArgs: any[]): Promise<void> {

    mwThis.options.sendVerificationEmail = false;

    if (!this._handyConfigService.get().userRegistration.verifyEmail) {
      return Promise.resolve();
    }

    let updateName: string = '';

    if (isNotEmpty(mwThis._update.$push) && isNotEmpty(mwThis._update.$push.changesHistory)) {
      updateName = mwThis._update.$push.changesHistory.$each[0].updateName;
    }

    if (updateName === 'Email verification') {
      return Promise.resolve();
    }

    let isDirectUpdate: boolean = true;
    let newEmail: string;

    if (isNotEmpty(mwThis._update.email)) {
      newEmail = mwThis._update.email;
    }

    if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.email)) {
      newEmail = mwThis._update.$set.email;
      isDirectUpdate = false;
    }

    if (isUndefined(newEmail)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {

      this._findOne(mwThis._conditions, { selectType: 'select', fields: ['email', 'newEmail', 'emailVerificationHash'] }).then(foundUser => {

        let { foundRecord, doc } = foundUser;

        if (!foundRecord) {
          return resolve();
        }

        if ((doc.email === newEmail)) {
          return resolve();
        }

        // ? Changing update to user actual email set in db
        if (isDirectUpdate) {
          mwThis._update.email = doc.email;
        } else {
          mwThis._update.$set.email = doc.email;
        }

        // ? Just avoiding repeating the same thing in case, user adds new email and then 
        // ? admin cganges role or something else...
        if (newEmail === doc.newEmail) {
          return resolve();
        }

        // ? Checking if actual update doesn't include new email in it's update,
        // ? Just in case, you know
        let isDirectNewEmailUpdate: boolean = true;
        let updateNewEmailVal: string;

        if (isNotEmpty(mwThis._update.newEmail)) {
          updateNewEmailVal = mwThis._update.newEmail;
        }

        if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.newEmail)) {
          updateNewEmailVal = mwThis._update.$set.newEmail;
          isDirectNewEmailUpdate = false;
        }

        // ? Changing update new email to provided value
        if (isDirectNewEmailUpdate) {
          mwThis._update.newEmail = newEmail;
        } else {
          mwThis._update.$set.newEmail = newEmail;
        }

        // ? Checking if actual update doesn't include verification hash in it's update,
        // ? Just in case, you know
        let hasDirectSetHash: boolean = false;
        let isDirectHashupdatepdate: boolean = true;
        let updateHashVal: string = this._handyUtilsService.generateHash({ length: 10, specialChars: false, emptySpace: false });

        if (isNotEmpty(mwThis._update.emailVerificationHash)) {
          hasDirectSetHash = true;
        }

        if (isNotEmpty(mwThis._update.$set) && isNotEmpty(mwThis._update.$set.emailVerificationHash)) {
          isDirectHashupdatepdate = false;
          hasDirectSetHash = true;
        }

        if (isEmpty(doc.emailVerificationHash) && !hasDirectSetHash) {

          // ? Changing update new email to provided value
          if (isDirectHashupdatepdate) {
            mwThis._update.emailVerificationHash = updateHashVal;
          } else {
            mwThis._update.$set.emailVerificationHash = updateHashVal;
          }

        }

        mwThis.options.sendVerificationEmail = { newEmail, updateHashVal };

        return resolve();

      })
        .catch(err => {

          return reject(this._handyError.register(err, 'high', 'Server error', undefined, { private: `Error while checking for email change` }));

        })

    })

  }

  @MongooseMW('updateOne', 'post')
  protected _afterUpdate(mwThis: any = {}, restArgs: any[]): Promise<any> {

    if (!this._handyConfigService.get().userRegistration.verifyEmail || mwThis.options.sendVerificationEmail === false) {
      return Promise.resolve();
    }

    if (isNotEmpty(mwThis.options.sendVerificationEmail) && isNotEmpty(mwThis.options.sendVerificationEmail.newEmail) && isNotEmpty(mwThis.options.sendVerificationEmail.updateHashVal)) {

      this._handyUserService.sendVerificationEmail(mwThis.options.sendVerificationEmail.newEmail, mwThis.options.sendVerificationEmail.updateHashVal).then(() => {
        // ? email sent, all good
      })
        .catch(err => {

          this._handyError.register(err, 'medium');

        })

    }

    return Promise.resolve();

  }

  @MongooseMW('updateOne', 'post')
  @MongooseMW('updateMany', 'post')
  protected _updateClientsAfterDataUpdate(mwThis: any = {}, restArgs: any[]): Promise<void> {

    return new Promise((resolve, reject) => {

      resolve();

      let { options = null } = mwThis;

      if (options && options.customOptions && options.customOptions.skipSocketEventEmit) {
        return;
      }

      let clientSessionId: string = (isNotEmpty(options) && isNotEmpty(options.request)) ? options.request.handyClientSessionId : null;

      try {

        this._distinct('_id', mwThis._conditions)
          .then(result => {

            let resultLen: number = result.length;

            if (resultLen > 0) {

              let finalUsersRooms: string[] = [];

              for (let i = 0; i < resultLen; i++) {
                const id = result[i];
                finalUsersRooms.push(`user_id_${id}`);
              }

              this._handySocketEmitter.emit('user-change', clientSessionId, '/web-app', finalUsersRooms);
            }

          })

        

      } catch (error) {
        this._handyError.register(error, 'medium', 'Server error', undefined, { private: 'Error while sending notifications to client about user update' })
      }

    })

  }

  @MongooseMW('save', 'post')
  protected _afterRegistration(mwThis: any = {}, restArgs: any[]): Promise<any> {

    let { email, emailVerificationHash, registeredViaInvitation } = mwThis;

    if (!this._handyConfigService.get().userRegistration.verifyEmail && !mwThis.hasVerifiedEmail) {

      if (registeredViaInvitation && isNotNullOrUndefined(email)) {

        this._handyUserService.sendPasswordResetEmail(email, true).then(() => {
          // ? email sent, all good
        })
          .catch(err => {

            this._handyError.register(err, 'medium');

          })

        return Promise.resolve();

      } else {
        return Promise.resolve();
      }

    }

    if (registeredViaInvitation && isNotNullOrUndefined(email)) {

      this._handyUserService.sendPasswordResetEmail(email, true).then(() => {
        // ? email sent, all good
      })
        .catch(err => {

          this._handyError.register(err, 'medium');

        })

      return Promise.resolve();

    }

    if (isNotNullOrUndefined(email) && isNotNullOrUndefined(emailVerificationHash)) {

      this._handyUserService.sendVerificationEmail(email, emailVerificationHash).then(() => {
        // ? email sent, all good
      })
        .catch(err => {

          this._handyError.register(err, 'medium');

        })
    }

    return Promise.resolve();

  }

}