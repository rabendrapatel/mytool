import { Component, OnInit, OnDestroy } from '@angular/core';
import { HandyNgUserService, HandyNgUtilsService } from '@handy-ng/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailRequestAction, UnSignedObject } from '@handy-ng/types';

@Component({
  selector: 'app-auth-message',
  templateUrl: './auth-message.component.html',
  styleUrls: ['./auth-message.component.scss']
})
export class AuthMessageComponent implements OnInit, OnDestroy {

  public action: MessageActions;

  protected actions: MessageActions[] = [
    'afterRegister',
    'emailVerified',
    'unlock',
    'verify',
    'passwordReset',
    'accountUnlocked',
    'afterPasswordReset',
    'logout'
  ];

  public headlines: MessageActionsString = {
    afterRegister: 'Your registration was sucessful',
    emailVerified: 'Your email was verified',
    unlock: 'Unlock link was sent',
    passwordReset: 'Password reset link was sent',
    verify: 'Verification email was sent',
    accountUnlocked: 'Your account was unlocked',
    afterPasswordReset: 'Your new password was saved',
    logout: `You've logged out`
  }

  public messages: MessageActionsString = {
    afterRegister: 'Check your email for account verification',
    emailVerified: 'You can login',
    unlock: 'Check your inbox and follow the instructions in sent email',
    passwordReset: 'Check your inbox and follow the instructions in sent email',
    verify: 'Check your inbox and follow the instructions in sent email',
    accountUnlocked: 'You can login',
    afterPasswordReset: 'You can login',
    logout: ''
  }

  protected _redirectActions: MessageActions[] = [
    'emailVerified', 'accountUnlocked', 'afterPasswordReset', 'logout'
  ];

  public redirects: MessageActionsRedirects = {
    emailVerified: {
      msg: 'You will be redirected to Log in page in',
      link: '/login',
      coutDownMs: 5000,
      queryParms: null
    },
    accountUnlocked: {
      msg: 'You will be redirected to Log in page in',
      link: '/login',
      coutDownMs: 5000,
      queryParms: null
    },
    afterPasswordReset: {
      msg: 'You will be redirected to Log in page in',
      link: '/login',
      coutDownMs: 5000,
      queryParms: null
    },
    logout: {
      msg: 'You will be redirected to Home page in',
      link: '/',
      coutDownMs: 5000,
      queryParms: null
    }
  }

  public countDown: number = 0;
  protected _countDownSub: Subscription;

  public email: string;

  constructor (
    public handyNguserService: HandyNgUserService,
    protected _route: ActivatedRoute,
    protected _router: Router,
    protected _handyNgUtilsService: HandyNgUtilsService) {

    this._parseRoute();

  }

  protected _parseRoute(): void {

    
    let { email = null, action = null } = this._route.snapshot.queryParams;
    if (!action) {
      action = this._route.snapshot.data.action;      
    }

    if (!action || !this.actions.includes(action)) {
      this.handyNguserService.redirectToErrPage('404');
      return;
    }

    this.email = email;
    this.action = action;

    if (this.action === 'logout') {
      this.handyNguserService.logout(true);
    }

    switch (this.action) {
      case 'emailVerified':
      case 'accountUnlocked':
      case 'afterPasswordReset':
      case 'logout':
        

        if (this.email) {
          this.redirects[this.action].queryParms = { email: this.email };
        }

        break;

      default:
        break;
    }

    if (this._redirectActions.includes(action)) {
      this.startCountDown();
    }

  }

  ngOnInit(): void {
  }

  protected startCountDown(): void {

    this._countDownSub = this._handyNgUtilsService.countDown(this.redirects[this.action].coutDownMs, 1000).subscribe(step => {

      let { timeLeft, complete } = step;

      this.countDown = timeLeft;

      if (complete) {
        this._router.navigate([this.redirects[this.action].link], { queryParams: this.redirects[this.action].queryParms });
      }

    })

  }

  ngOnDestroy(): void {

    if (this._countDownSub) {
      this._countDownSub.unsubscribe(); 
    }

  }

}

type MessageActions = EmailRequestAction | 'afterRegister' | 'emailVerified' | 'accountUnlocked' | 'afterPasswordReset' | 'logout';
type MessageActionsString = { [key in MessageActions]: string };
type MessageActionsRedirects = { [key in MessageActions]?: {
  link: string,
  msg: string,
  coutDownMs: number,
  queryParms: UnSignedObject
} };