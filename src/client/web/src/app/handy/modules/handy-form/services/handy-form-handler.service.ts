import { Injectable } from '@angular/core';

@Injectable()
export class HandyFormHandlerService {

  public _pinning: boolean = false;

  constructor() { }

  public get pinning(): boolean {
    return this._pinning;
  }

  public toggleFormPinning(): void {
    this._pinning = !this._pinning;
  }

}
