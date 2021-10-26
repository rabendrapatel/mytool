import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { HandyServiceLoadedHandler } from '@handy-ng/extenders';
import { HandyNgLayoutService } from '@handy-ng/services';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class HandyChartService extends HandyServiceLoadedHandler {

  private __scriptSrc: string = '/assets/charts/loader.js';
  private __appendedScript: boolean = false;
  private __renderer: Renderer2;

  private google: any;
  public colors: { [key: string]: { light: string, dark: string } } = {
    a: {
      light: '#3366cc',
      dark: '#3366cc'
    },
    b: {
      light: '#dc3912',
      dark: '#dc3912'
    },
    c: {
      light: '#ff9900',
      dark: '#ff9900'
    },
    d: {
      light: '#109618',
      dark: '#109618'
    },
    e: {
      light: '#990099',
      dark: '#990099'
    },    
    f: {
      light: '#ef6c00',
      dark: '#ffa726'
    }
   
  }

  public colorsNames: string[] = Object.keys(this.colors);
  private colorsLen: number = this.colorsNames.length;

  constructor (
    @Inject(DOCUMENT) private _document,
    private __layoutService: HandyNgLayoutService
  ) {

    super();
  }

  public getGoogle() {
    return google;
  }

  public addRenderer(renderer: Renderer2) {

    if (!this.__renderer) {
      this.__renderer = renderer;
      this.appendScript();
    }

  }

  private appendScript(): void {

    if (this.__appendedScript) {
      return;
    }

    let firstScript = this.__renderer.createElement('script');
    firstScript.type = 'text/javascript';
    firstScript.async = true;
    firstScript.src = this.__scriptSrc;

    this.__renderer.appendChild(this._document.head, firstScript);
    this.__appendedScript = true;

    this.__checkForLoadedGoogle();

  }

  public __checkForLoadedGoogle(): void {

    try {

      this.google = google;
      this._markStateAsLoaded();

    } catch (error) {
      setTimeout(() => {
        this.__checkForLoadedGoogle();
      }, 250);
    }

  }

  public getChartColors(): string[] {
    let result: string[] = [];

    let colorType: 'dark' | 'light' = this.__layoutService.darkTheme ? 'light' : 'dark';
    for (let i = 0; i < this.colorsLen; i++) {
      const colorName = this.colorsNames[i];
      result.push(this.colors[colorName][colorType]);
    }

    return result;

  }
 
  public getSingleColor(index: number, colorsLen: number, customColors: string[] = []): string {

    // let colorType: 'dark' | 'light' = 'light';
    let colorType: 'dark' | 'light' = this.__layoutService.darkTheme ? 'dark' : 'light';

    colorType = 'dark'
    let isLast: boolean = colorsLen !== 1 && index === colorsLen - 1;

    while (index >= this.colorsLen) {
      index = index - this.colorsLen;
    }

    if (isLast && index === 0) {
      index = 1;
    }

    if (customColors.length > 0) {

      return customColors[index];

    }

    const colorName = this.colorsNames[index];
    return this.colors[colorName][colorType];

  }
   
  public getSliceBorderColor(): string {
    return this.__layoutService.darkTheme ? '#3a4149' : '#fafafa';
  }
  
  public getOtherSliceColor(): string {
    return this.__layoutService.darkTheme ? '#757575' : '#3a4149';
  }
  
  public getGridLineColor(): string {
    return this.__layoutService.darkTheme ? '#424242' : '#e0e0e0';
  }
  
  public getLineChartTextColor(): string {
    return this.__layoutService.darkTheme ? '#fafafa' : '#3a4149';
  }

}
