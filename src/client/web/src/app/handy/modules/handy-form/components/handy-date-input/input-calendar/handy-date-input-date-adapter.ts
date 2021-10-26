import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HandyDateInputAdapter extends MomentDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

}