import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { BasicBtnComponent } from '../basic-btn/basic-btn.component';

@Component({
  selector: 'raised-btn',
  templateUrl: './raised-btn.component.html',
  styleUrls: ['./raised-btn.component.scss'],
  inputs: [
    'type', 'disabled', 'disableRipple',
    'color', 'icon', 'iconPosition',

  ]
})
export class RaisedBtnComponent extends BasicBtnComponent implements OnInit {

  constructor (protected __renderer: Renderer2, protected __elm: ElementRef) {
    super(__renderer, __elm);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
