import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { BasicBtnComponent } from '../basic-btn/basic-btn.component';

@Component({
  selector: 'mini-fab-btn',
  templateUrl: './mini-fab-btn.component.html',
  styleUrls: ['./mini-fab-btn.component.scss'],
  inputs: [
    'type', 'disabled', 'disableRipple',
    'color', 'icon', 
  ]
})
export class MiniFabBtnComponent extends BasicBtnComponent implements OnInit {

  constructor (protected __renderer: Renderer2, protected __elm: ElementRef) {
    super(__renderer, __elm);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
