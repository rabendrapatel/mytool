import { Component, OnInit } from '@angular/core';
import { BasicBtnComponent } from '../basic-btn/basic-btn.component';

@Component({
  selector: 'stroked-btn',
  templateUrl: './stroked-btn.component.html',
  styleUrls: ['./stroked-btn.component.scss'],
  inputs: [
    'type', 'disabled', 'disableRipple',
    'color', 'icon', 'iconPosition',

  ]
})
export class StrokedBtnComponent extends BasicBtnComponent implements OnInit {

  constructor () {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
