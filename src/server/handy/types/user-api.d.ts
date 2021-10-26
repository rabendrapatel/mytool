import { UserModelInterfaces } from './../../models/user/model.interface';
import { TokenData } from '@handy/types';

export interface CanUserLogIn {
  can: boolean,
  reason: 'locked' | 'banned' | 'unverified'
}

export interface WebAppLoginResult {
  userData?: Omit<UserModelInterfaces['fullModelShape'], 'password'>,
  accessTokenData?: TokenData,
  failReason?: CanUserLogIn['reason'] | 'invalidCreds',
  lockedTill?: number,
  lockTimeLeft?: number
}