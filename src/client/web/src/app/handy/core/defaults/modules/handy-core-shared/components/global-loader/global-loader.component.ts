import { Component, OnInit } from '@angular/core';
import { HandyNgConfigService } from '@handy-ng/services';

@Component({
  selector: 'global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss']
})
export class GlobalLoaderComponent implements OnInit {

  constructor(public handyNgConfigService: HandyNgConfigService) { }

  ngOnInit(): void {
  }

}
