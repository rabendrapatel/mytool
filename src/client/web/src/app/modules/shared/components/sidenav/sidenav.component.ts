import { HandyNgLayoutService, HandyNgConfigService, HandyNgUserService } from '@handy-ng/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'handy-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(
    public handyNgLayoutService: HandyNgLayoutService,
    public handyNgCofigService: HandyNgConfigService,
    public handyNguserService: HandyNgUserService) {}

  ngOnInit(): void {}

}
