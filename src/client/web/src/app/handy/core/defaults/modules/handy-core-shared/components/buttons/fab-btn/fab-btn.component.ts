import { Component, OnInit } from '@angular/core';
import { BasicBtnComponent } from '../basic-btn/basic-btn.component';

@Component({
  selector: 'fab-btn',
  templateUrl: './fab-btn.component.html',
  styleUrls: ['./fab-btn.component.scss'],
  inputs: [
    'type', 'disabled', 'disableRipple',
    'color', 'icon',
  ]
})
export class FabBtnComponent extends BasicBtnComponent implements OnInit {

  constructor () {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}