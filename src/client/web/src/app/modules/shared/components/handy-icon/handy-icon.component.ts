import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'handy-icon',
  templateUrl: './handy-icon.component.html',
  styleUrls: ['./handy-icon.component.scss']
})
export class HandyIconComponent implements OnInit {

  public _icon: string;
  public _color: string;
  public _iconFontSize: string = '20px';
  public _iconDimensions: string = '24px';
  public _iconPlacement: string = 'icon_placement_default';
  public _badge: string;
  public _badgePosition: string = 'above after';
  public _badgeSize: string = 'small';
  public _badgeColor: string;
  public _iconSet: 'fas' | 'far' = 'fas';
  private _iconsSufixes: string[] = ['otl', 'rnd', 'ttn', 'shrp', 'def'];
  public _iconMatClass: string = 'material-icons'; 

  @Input() set icon(iconToShow: string) {

    if (typeof iconToShow !== 'string' || iconToShow.length === 0) {
      iconToShow = '';
    }

    let suffix: string[] = iconToShow.split('_');
    let suffixLen: number = suffix.length;
    let type = 'default';
    if (suffixLen > 1) {
      type = suffix[suffixLen - 1];
    }

    if (this._iconsSufixes.includes(type)) {
      iconToShow = iconToShow.replace('_' + type, '');
    } else {
      type = 'def';
    }

    switch (type) {
      case 'def':
        this._iconMatClass = 'material-icons';
        break;

      case 'otl':
        this._iconMatClass = 'material-icons-outlined';
        break;

      case 'rnd':
        this._iconMatClass = 'material-icons-round';
        break;

      case 'ttn':
        this._iconMatClass = 'material-icons-two-tone';
        break;

      case 'shrp':
        this._iconMatClass = 'material-icons-sharp';
        break;

      default:
        this._iconMatClass = 'material-icons';
        break;
    }
    

    this._icon = iconToShow;
  }

  @Input() set size(iconSize: number) {
    this._iconFontSize = iconSize + 'px';
    this._iconDimensions = iconSize + 4 + 'px';
  }

  @Input() set placement(iconType: HandyIconTypes) {
    this._iconPlacement = 'icon_placement_' + iconType;

    switch (iconType) {
      case 'btn-left-icon':
      case 'btn-right-icon':

        this.size = 14;

        break;

      default:
        break;
    }
  }

  @Input() set color(colorToSet: 'primary' | 'warn' | 'accent') {
    this._color = colorToSet;
  }

  @Input() set badge(badge: string) {
    this._badge = badge;
  }

  @Input() set badgePosition(badgePosition: string) {
    this._badgePosition = badgePosition;
  }

  @Input() set badgeSize(badgeSize: string) {
    this._badgeSize = badgeSize;
  }

  @Input() set badgeColor(badgeColor: string) {
    this._badgeColor = badgeColor;
  }

  constructor () { }

  ngOnInit(): void {
  }

}

type HandyIconTypes = 'default' | 'mat-icon-button' | 'sidenav' | 'sidenav-right' | 'btn-left-icon' | 'btn-right-icon' | 'file-thumb';

