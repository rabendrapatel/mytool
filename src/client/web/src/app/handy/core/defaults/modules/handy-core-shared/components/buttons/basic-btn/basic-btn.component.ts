import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'basic-btn',
  templateUrl: './basic-btn.component.html',
  styleUrls: ['./basic-btn.component.scss']
})
export class BasicBtnComponent implements OnInit {

  public btnWithIconClass: 'btn-with-icon';
  public hasIcon: boolean = false;

  public _type: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() public set type(type: 'button' | 'menu' | 'reset' | 'submit') {
    this._type = type;
  }

  public _disabled: boolean = false;
  @Input() public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  
  public _disableRipple: boolean = false;
  @Input() public set disableRipple(disableRipple: boolean) {
    this._disableRipple = disableRipple;
  }

  public _color: 'primary' | 'accent' | 'warn';
  @Input() public set color(color: 'primary' | 'accent' | 'warn') {
    this._color = color;
  }
  
  public _icon: string;
  @Input() public set icon(icon: string) {

    this.btnWithIconClass = (icon) ? 'btn-with-icon' : null;
    this.hasIcon = !!icon;
    this._icon = icon;

  }
  
  public _iconPosition: 'left' | 'right' = 'left';
  @Input() public set iconPosition(iconPosition: 'left' | 'right') {
    this._iconPosition = iconPosition;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
