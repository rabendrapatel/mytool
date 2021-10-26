import { Directive, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { HandyNgUserService } from '@handy-ng/services';

@Directive()
export abstract class DefaultCopyToCLipboardClickDirective {

  protected _content: string = '';
  @Input() public set copyClick(content: string) {
    this._content = content;
  };
  
  protected _copyMsg: string = 'Copied to clipboard';
  @Input() public set copyMsg(content: string) {
    this._copyMsg = content;
  };
  
  protected _disabled: boolean = false;
  @Input() public set disabled(disabled: boolean) {
    this._disabled = disabled;
  };

  constructor (
    protected _clipBoard: Clipboard,
    protected _userService: HandyNgUserService
    ) { }

  onClick() {

    if (this._disabled) {
      return;
    }

    this._clipBoard.copy(this._content);

    if (!this._copyMsg) {
      return;
    }

    this._userService.notify.simpleMsgNotification({
      msg: this._copyMsg
    })

  }

}
