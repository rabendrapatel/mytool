import { Directive, HostListener } from '@angular/core';
import { DefaultCopyToCLipboardClickDirective } from '../core/defaults/directives/copy-to-clipboard-click';
import { Clipboard } from '@angular/cdk/clipboard';
import { HandyNgUserService } from '@handy-ng/services';

@Directive({
  selector: '[copyClick]',
  inputs: [
    'copyClick',
    'copyMsg',
    'disabled'
  ]
})
export class CopyToClipboardClickDirective extends DefaultCopyToCLipboardClickDirective {

  constructor (
    protected _clipBoard: Clipboard,
    protected _userService: HandyNgUserService) {

    super(_clipBoard, _userService);

  }

  @HostListener('click', ['$event.target'])
  onClick() {

    super.onClick();

  }

}
