import { Component, OnInit } from '@angular/core';
import { BasicBtnComponent } from '../basic-btn/basic-btn.component';

@Component({
  selector: 'icon-btn',
  templateUrl: './icon-btn.component.html',
  styleUrls: ['./icon-btn.component.scss'],
  inputs: [
    'type', 'disabled', 'disableRipple',
    'color', 'icon', 
  ]
})
export class IconBtnComponent extends BasicBtnComponent implements OnInit {

  constructor () {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
