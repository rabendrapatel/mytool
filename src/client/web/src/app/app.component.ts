import { HandyNgLayoutService } from '@handy-ng/services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // ! Keep the HandyNgLayoutService in order to keep propper loading
  constructor (public layout: HandyNgLayoutService) {}

}
