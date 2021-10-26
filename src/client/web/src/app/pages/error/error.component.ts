import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HandyNgUtilsService } from '@handy-ng/services';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public code: string;
  public headline: string = 'Unknown error'
  public msg: string = `Something went wrong, we've been notified about this error and we are working on fixing it`;
  public refCode: string;

  constructor (
    protected _route: ActivatedRoute,
    protected _handyNhUtilsService: HandyNgUtilsService) {

    let { code = '0', refCode = null } = this._route.snapshot.queryParams;

    if (this._route.snapshot.data.code) {
      code = this._route.snapshot.data.code;
    }

    this.code = code;
    let { headline, msg } = this._handyNhUtilsService.getErrStringsFromCode(this.code);
    this.msg = msg;
    this.headline = headline;

    if (refCode) {
      this.refCode = refCode;
    }

   }

  ngOnInit(): void {
  }

}

