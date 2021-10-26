import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { BasicBtnComponent } from '../basic-btn/basic-btn.component';

@Component({
  selector: 'flat-btn',
  templateUrl: './flat-btn.component.html',
  styleUrls: ['./flat-btn.component.scss'],
  inputs: [
    'type', 'disabled', 'disableRipple',
    'color', 'icon', 'iconPosition',

  ]
})
export class FlatBtnComponent extends BasicBtnComponent implements OnInit {

  constructor (protected __renderer: Renderer2, protected __elm: ElementRef) {
    super(__renderer, __elm);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
