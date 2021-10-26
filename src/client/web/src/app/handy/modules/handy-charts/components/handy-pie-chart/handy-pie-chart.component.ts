import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HandyNgLayoutService, HandyNgUtilsService } from '@handy-ng/services';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HandyChartService } from '../../handy-chart.service';

@Component({
  selector: 'handy-pie-chart',
  templateUrl: './handy-pie-chart.component.html',
  styleUrls: ['./handy-pie-chart.component.scss']
})
export class HandyPieChartComponent implements OnInit, AfterContentInit, OnDestroy {

  private google: any;
  public chart: any;
  public randomId: string;
  public rendered: boolean = false;
  private __onHold: boolean = false;

  @ViewChild('parent') public parentElm: ElementRef;

  private __selectEvent: Subject<number> = new Subject();

  public __resizeSubject: Subject<void> = new Subject();
  public resising: boolean = false;

  private __drawTrigger: Subject<void> = new Subject();

  private __themeChangeSub: Subscription;
  private __chartReady: boolean = false;
  public readonly colors = [...this.__chartService.getChartColors()];

  /* --------------------------------- Colors --------------------------------- */
  private __customColors: string[] = [];
  @Input('customColors') public set customColors(set: string[]) {
    this.__customColors = set;
    this.__drawTrigger.next();
  }

  /* ---------------------------- Tootltip settings --------------------------- */

  private __tooltip: Tooltip = 'both';
  @Input('tooltip') public set tooltip(set: Tooltip) {
    this.__tooltip = set;
    this.__drawTrigger.next();
  }

  public get tooltip(): Tooltip {
    return this.__tooltip;
  }
  
  private __sliceText: SliceText = 'label';
  @Input('sliceText') public set sliceText(set: SliceText) {
    this.__sliceText = set;
    this.__drawTrigger.next();
  }

  public get sliceText(): SliceText {
    return this.__sliceText;
  }
  
  private __toolTipParserFn: LabelParser;
  @Input('toolTipParserFn') public set toolTipParserFn(set: LabelParser) {
    this.__toolTipParserFn = set;
    this.__generateSlices();
  }

  public get toolTipParserFn(): LabelParser {
    return this.__toolTipParserFn;
  }

  /* ----------------------------- Donut settings ----------------------------- */

  private __donut: boolean = false;
  @Input('donut') public set donut(is: boolean) {
    this.__donut = is;
    this.__generateSlices();
  }

  public get donut(): boolean {
    return this.__donut;
  }

  private __donutHoleSize: DonutHole = 0.5;
  @Input('donutHoleSize') public set donutHoleSize(size: DonutHole) {
    this.__donutHoleSize = size;
    this.__generateSlices();
  }

  public get donutHoleSize(): DonutHole {
    return this.__donutHoleSize;
  }

  /* --------------------------- Selecttion settings -------------------------- */

  private __selectedIndex: number;
  @Input('selectedIndex') public set selectedIndex(index: number) {
    this.__selectedIndex = index;
    this.__generateSlices();
  }

  public get selectedIndex(): number {
    return this.__selectedIndex;
  }

  private __offsetSelected: boolean = false;
  @Input('offsetSelected') public set offsetSelected(is: boolean) {
    this.__offsetSelected = is;
    this.__generateSlices();
  }

  public get offsetSelected(): boolean {
    return this.__offsetSelected;
  }

  private __offsetSize: DonutHole = 0.1;
  @Input('offsetSize') public set offsetSize(size: DonutHole) {
    this.__offsetSize = size;
    this.__generateSlices();
  }

  public get offsetSize(): DonutHole {
    return this.__offsetSize;
  }

  /* ---------------------------------- Data ---------------------------------- */

  private __data: PieChartData = [];
  @Input('data') public set data(data: PieChartData) {
    this.__data = data;
    this.__generateSlices();
  }

  public get data(): PieChartData {
    return this.__data;
  }

  /* ---------------------------- Slice treshold ---------------------------- */

  private __otherTreshold: number = 0;
  @Input('otherTreshold') public set otherTreshold(percent: number) {

    if (percent >= 50) {
      percent = 49;
    }

    this.__otherTreshold = percent;
    this.__generateSlices();
  }

  public get otherTreshold(): number {
    return this.__otherTreshold;
  }

  private __otherLabel: string = 'Other';
  @Input('otherLabel') public set otherLabel(label: string) {
    this.__otherLabel = label;
    this.__generateSlices();
  }

  public get otherLabel(): string {
    return this.__otherLabel;
  }

  private __otherColor: string;
  @Input('otherColor') public set otherColor(label: string) {
    this.__otherColor = label;
    this.__generateSlices();
  }

  public get otherColor(): string {
    return this.__otherColor;
  }

  private __slices: Slice[] = [];
  public set slices(slices: Slice[]) {
    this.__slices = slices;
  }

  public get slices(): Slice[] {
    return this.__slices;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  constructor (
    private __renderer: Renderer2,
    private __handyNgUtils: HandyNgUtilsService,
    private __layoutService: HandyNgLayoutService,
    private __chartService: HandyChartService,) {

    this.randomId = this.__handyNgUtils.generateHash({ emptySpace: false, specialChars: false, capitalsLetters: false }, true);
    this.__chartService.addRenderer(this.__renderer);


  }

  ngOnInit(): void {

    this.__themeChangeSub = this.__layoutService.layoutChange.subscribe(event => {

      if (this.rendered) {

        switch (event) {
          case 'sidenavOpen':
          case 'pinnedState':

            this.resising = true;
            setTimeout(() => {
              this.__drawChart(true)
            }, 400);

            break;

          default:

            this.__generateSlices();
            break;

        }

      }

    })

    this.__drawTrigger.pipe(debounceTime(100)).subscribe(() => {
      this.__drawChart();
    })

  }

  ngAfterContentInit(): void {

    this.__chartService.onStateLoaded(() => {

      this.google = this.__chartService.getGoogle();
      this.google.charts.load('current', { 'packages': ['corechart'] });
      this.google.charts.setOnLoadCallback(this.__drawChart.bind(this));

    })

    this.__resizeSubject.pipe(debounceTime(100)).subscribe(() => {
      this.__drawChart(true);
    })

  }

  private __drawChart(onResize: boolean = false) {

    if (!this.google || !this.google.visualization) {

      if (!this.__onHold) {

        this.__onHold = true;
        this.__drawTrigger.next();

      }

      return;
    }

    this.__chartReady = false;
    this.__onHold = false;

    this.rendered = true;

    if (onResize) {
      this.resising = false;
    }

    if (!this.chart) {
      this.__setChartInstance();
    }

    this.chart.draw(this.__parseDataToRender(), this.__parseOptions());
    this.__setSelection();

  }

  private __setSelection(): void {

    if (!this.__chartReady) {

      setTimeout(() => {
        this.__setSelection();
      }, 100);

      return;

    }

    if (this.__selectedIndex >= this.__slices.length) {
      this.selectedIndex = this.__slices.length - 1;
      return;
    }

    this.chart.setSelection([{
      row: this.__selectedIndex,
      column: null
    }])

  }

  private __setChartInstance(): void {

    this.chart = new this.google.visualization.PieChart(document.getElementById(this.randomId));

    this.google.visualization.events.addListener(this.chart, 'ready', () => {
      this.__chartReady = true;
    });

    this.google.visualization.events.addListener(this.chart, 'select', () => {

      this.selectedIndex = this.__getSelectedRow();

    });

  }

  private __getSelectedRow(): number {

    let selection: any[] = this.chart.getSelection();
    let selectedRow: number = null;

    if (selection.length > 0) {
      selectedRow = selection[0]['row'];
    }

    return selectedRow;

  }

  private __parseDataToRender(): any {

    let dataTable = new this.google.visualization.DataTable();
    dataTable.addColumn('string', 'Label');
    dataTable.addColumn('number', 'Value');

    if (this.__toolTipParserFn) {
      
      // A column for custom tooltip content
      dataTable.addColumn({ type: 'string', role: 'tooltip' });

    }

    let slicesLen: number = this.slices.length;
    for (let i = 0; i < slicesLen; i++) {
      const { label, value } = this.slices[i];

      if (this.__toolTipParserFn) {
        dataTable.addRow([label, value, this.__toolTipParserFn(label, value)]);
      } else {
        dataTable.addRow([label, value]);
      }

    }

    return dataTable;

  }

  private __parseOptions(): any {

    let parentWidth = this.parentElm.nativeElement.offsetWidth;
    let offsetSlice: boolean = this.__offsetSelected && typeof this.__selectedIndex === 'number';
    let areaSize: number = offsetSlice ? parentWidth - 105 : parentWidth - 30;

    let slices: { [key: number]: ChartSlice } = {};
    let slicesLen: number = this.__slices.length;
    for (let i = 0; i < slicesLen; i++) {
      const { index, selected, color } = this.__slices[i];
      slices[index] = {
        color
      }

      if (offsetSlice && selected && slicesLen > 1) {
        slices[index].offset = this.__offsetSize;
      }

    }

    let options = {
      backgroundColor: 'transparent',
      legend: { position: 'none' },
      chartArea: { width: areaSize, height: areaSize }, //without offset
      width: parentWidth,
      height: parentWidth,
      slices,
      tooltip: {text: this.__tooltip},
      pieSliceText: this.__sliceText,
      pieHole: this.__donut ? this.__donutHoleSize : 0,
      pieSliceBorderColor: this.__chartService.getSliceBorderColor(),
      pieSliceTextStyle: { color: '#fafafa', fontName: 'Roboto' },
      colors: this.colors,
      fontName: 'Roboto'
    };

    return options;

  }

  private __generateSlices(): void {

    let total: number = 0;

    let dataLen: number = this.__data.length;
    for (let i = 0; i < dataLen; i++) {
      const singleSet = this.__data[i];
      total += singleSet[1];
    }

    let onePercentVal: number = total / 100;
    let tresholdVal: number = onePercentVal * this.__otherTreshold;
    let otherVal: number = 0;
    let hasOther: boolean = false;
    let otherSlice: Slice = {
      index: 0,
      color: this.__otherColor ? this.__otherColor : this.__chartService.getOtherSliceColor(),
      label: this.__otherLabel,
      value: 0,
      selected: false,
      percent: 0,
      select: () => {

      }
    }

    let slices: Slice[] = [];

    for (let i = 0; i < dataLen; i++) {
      const singleSet = this.__data[i];

      let value: number = singleSet[1];
      let percent: number = value / onePercentVal;

      if (singleSet[1] < tresholdVal) {
        otherVal += singleSet[1];
        hasOther = true;
        otherSlice.value += value;
        otherSlice.percent += percent;
      } else {
        slices.push({
          index: 0,
          color: '000',
          label: singleSet[0],
          selected: false,
          value,
          percent,
          select: () => {
            
          }
        })
      }

    }

    slices = slices.sort((slice1, slice2) => {
      return slice1.value < slice2.value ? 1 : -1;
    })

    let slicesLen: number = slices.length;
    for (let i = 0; i < slicesLen; i++) {
      const singleSlice = slices[i];
      singleSlice.index = i;
      singleSlice.color = this.__chartService.getSingleColor(i, slicesLen, this.__customColors);
      singleSlice.selected = this.__selectedIndex === i;
      singleSlice.select = () => {

        if (this.__selectedIndex !== i) {
          this.selectedIndex = i;
        } 
      }
    }
    
    if (hasOther) {
      otherSlice.index = slicesLen;
      otherSlice.selected = this.__selectedIndex === slicesLen;
      otherSlice.select = () => {

        if (this.__selectedIndex !== slicesLen) {
          this.selectedIndex = slicesLen;
        }
      }

      slices.push(otherSlice);
    }

    this.slices = slices;
    this.__drawTrigger.next();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    this.resising = true;
    this.__resizeSubject.next();

  }

  ngOnDestroy() {

    if (this.__resizeSubject) {
      this.__resizeSubject.complete();
    }

    if (this.__selectEvent) {
      this.__selectEvent.complete();
    }

    if (this.__themeChangeSub) {
      this.__themeChangeSub.unsubscribe();
    }

    if (this.__drawTrigger) {
      this.__drawTrigger.complete();
    }

  }

}

export interface Slice {
  index: number,
  color: string,
  label: string,
  value: number,
  percent: number,
  selected: boolean,
  select: () => void
}

export type PieChartData = [string, number][];
export type DonutHole = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9;
interface ChartSlice {
  color: string,
  offset?: number,
}

export type Tooltip = 'both' | 'value' | 'percentage';
export type SliceText = 'label' | 'value' | 'percentage' | 'none';
export type LabelParser = (label: string, value: number) => string;


/*
  color - The color to use for this slice. Specify a valid HTML color string.

'both' - [Default] Display both the absolute value of the slice and the percentage of the whole.
'value' - Display only the absolute value of the slice.
'percentage' -

offset - How far to separate the slice from the rest of the pie, from 0.0 (not at all) to 1.0 (the pie's radius).
textStyle - Overrides the global pieSliceTextStyle for this slice.

*/