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

  @Input() set icon(iconToShow: string) {
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

  constructor() { }

  ngOnInit(): void {
  }

}

type HandyIconTypes = 'default' | 'mat-icon-button' | 'sidenav' | 'sidenav-right' | 'btn-left-icon' | 'btn-right-icon' | 'file-thumb';

