import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'handy-mobile-numpad',
  templateUrl: './handy-mobile-numpad.component.html',
  styleUrls: ['./handy-mobile-numpad.component.scss']
})
export class HandyMobileNumpadComponent implements OnInit, OnDestroy {

  @Input() public value: any;
  @Output() public keydown: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() public close: EventEmitter<void> = new EventEmitter();

  protected _pressing: boolean = false;
  protected _pressInterval: NodeJS.Timeout;

  protected keysDetails: any = {
    '0': {
      code: 'Numpad0'
    }
  };

  constructor () { }

  ngOnInit() {
  }

  public keyDownEmit(key: any): void {

    let event = new KeyboardEvent("keydown", {
      key,
      metaKey: false,
      ctrlKey: false
    } as KeyboardEventInit);

    this.keydown.emit(event);

  }

  public pressEvent(key: any): void {

    this._pressing = true;

    setTimeout(() => {

      if (this._pressInterval) {
        clearInterval(this._pressInterval)
      }

      this._pressInterval = setInterval(() => {
  
        if (this._pressing) {
          this.keyDownEmit(key);
        } else {
          clearInterval(this._pressInterval);
        }
  
      }, 75);

    }, 500)

  }

  public pressRelease(): void {
    this._pressing = false;
  }

  public closeEmit(): void {

    this.close.emit();

  }

  ngOnDestroy(): void {

    if (this._pressInterval) {
      clearInterval(this._pressInterval);
    }

  }

}