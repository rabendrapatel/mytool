import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HandyNgLayoutService, HandyNgUtilsService } from '@handy-ng/services';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HandyChartService } from '../../handy-chart.service';

@Component({
  selector: 'handy-line-chart',
  templateUrl: './handy-line-chart.component.html',
  styleUrls: ['./handy-line-chart.component.scss']
})
export class HandyLineChartComponent implements OnInit, AfterContentInit, OnDestroy {

  private google: any;
  public chart: any;
  public randomId: string;
  public rendered: boolean = false;
  private __onHold: boolean = false;

  @ViewChild('parent') public parentElm: ElementRef;

  private __selectEvent: Subject<number> = new Subject();

  public __resizeSubject: Subject<void> = new Subject();
  public resising: boolean = false;

  private __themeChangeSub: Subscription;
  private __chartReady: boolean = false;

  /* --------------------------------- Colors --------------------------------- */
  private __customColors: string[] = [];
  @Input('customColors') public set customColors(set: string[]) {
    this.__customColors = set;
    this.__drawTrigger.next();
  }

  /* ------------------------------ Style setting ----------------------------- */

  private __continous: boolean = false;
  @Input('continous') public set continous(is: boolean) {

    if (this.__continous !== is) {
      this.__continous = is;
      this.__drawTrigger.next();
    }

  }
  
  private __curved: boolean = false;
  @Input('curved') public set curved(is: boolean) {

    if (this.__curved !== is) {
      this.__curved = is;
      this.__drawTrigger.next();
    }

  }
  
  private __showVerAxis: boolean = true;
  @Input('showVerAxis') public set showVerAxis(show: boolean) {

    if (this.__showVerAxis !== show) {
      this.__showVerAxis = show;
      this.__drawTrigger.next();
    }

  }
  
  private __showPoints: 'none' | 'all' | 'selected' = 'none';
  @Input('showPoints') public set showPoints(showTipe: 'none' | 'all' | 'selected') {

    if (this.__showPoints !== showTipe) {
      this.__showPoints = showTipe;
      this.__drawTrigger.next();
    }

  }

  private __toolTipParserFn: ToolTipParserFn;
  @Input('toolTipParserFn') public set toolTipParserFn(set: ToolTipParserFn) {
    this.__toolTipParserFn = set;
    this.__drawTrigger.next();
  }

  public get toolTipParserFn(): ToolTipParserFn {
    return this.__toolTipParserFn;
  }

  /* --------------------------- Selecttion settings -------------------------- */

  private __selectedLineIndex: number;
  @Input('selectedLineIndex') public set selectedLineIndex(index: number) {

    if (this.__selectedLineIndex !== index) {
      this.__selectedLineIndex = index;
      this.__drawTrigger.next();
    }

  }

  public get selectedLineIndex(): number {
    return this.__selectedLineIndex;
  }

  private __selectedPointIndex: number;
  @Input('selectedPointIndex') public set selectedPointIndex(index: number) {

    if (this.__selectedPointIndex !== index) {
      this.__selectedPointIndex = index;
      this.__drawTrigger.next();
    }

  }

  public get selectedPointIndex(): number {
    return this.__selectedPointIndex;
  }

  /* ---------------------------------- Data ---------------------------------- */

  private __data: LineChartData;
  @Input('data') public set data(data: LineChartData) {
    this.__data = data;
    this.__drawTrigger.next();
  }

  public get data(): LineChartData {
    return this.__data;
  }

  private __lines: Line[];
  public set lines(lines: Line[]) {
    this.__lines = lines;
  }

  public get lines(): Line[] {
    return this.__lines;
  }

  private __series: { [key: number]: Serie } = {};
  private __dataTable: any;
  private __ticks: Ticks = [];
  private __minVal: number;
  private __maxVal: number;

  private __drawTrigger: Subject<void> = new Subject();

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
              this.__drawChart(true);
            }, 400);

            break;

          default:

            this.__drawTrigger.next();
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

    this.rendered = true;

    this.__parseDataToRender();

    this.__chartReady = false;
    this.__onHold = false;


    if (onResize) {
      this.resising = false;
    }

    if (!this.chart) {
      this.__setChartInstance();
    }

    this.chart.draw(this.__dataTable, this.__parseOptions());
    this.__setSelection();

  }

  private __setSelection(): void {

    if (!this.__chartReady) {

      setTimeout(() => {
        this.__setSelection();
      }, 100);

      return;

    }

    let linesLen: number = this.__toolTipParserFn ? (this.__lines.length * 2 - 1) : this.__lines.length;

    if (typeof this.__selectedLineIndex === 'number' && this.__selectedLineIndex > linesLen) {
      this.selectedLineIndex = linesLen;
      return;
    }

    if (typeof this.__selectedPointIndex !== 'number' && this.__selectedPointIndex > this.__data.xAxis.points.length) {
      this.selectedPointIndex = this.__data.xAxis.points.length - 1;
      return;
    }

    this.chart.setSelection([{
      row: this.__selectedPointIndex,
      column: this.__selectedLineIndex
    }])

  }

  private __setChartInstance(): void {

    this.chart = new this.google.visualization.LineChart(document.getElementById(this.randomId));

    this.google.visualization.events.addListener(this.chart, 'ready', () => {
      this.__chartReady = true;
    });

    this.google.visualization.events.addListener(this.chart, 'select', () => {

      this.__getSelection();

    });

  }

  private __getSelection(): void {

    let selection: any[] = this.chart.getSelection();
    if (selection.length > 0) {
      this.selectedPointIndex = selection[0]['row'];
      let line = selection[0]['column'];
      this.selectedLineIndex = typeof line !== 'number' ? null : line;
      return;
    }

    this.selectedPointIndex = null;
    this.selectedLineIndex = null;

  }

  private __parseDataToRender(): any {

    let dataTable = new this.google.visualization.DataTable();

    let data: LineChartData = this.__data;
    let lines: Line[] = [];
    let ticks: Ticks = [];

    // Xaxis column
    dataTable.addColumn(this.__continous ? 'number' : 'string', data.xAxis.label);
    let linesCols: string[] = Object.keys(data.lines);
    let linesLen: number = linesCols.length;

    for (let i = 0; i < linesLen; i++) {
      const colName = linesCols[i];

      dataTable.addColumn('number', colName);

      if (this.__toolTipParserFn) {
        dataTable.addColumn({ type: 'string', role: 'tooltip' });
      }

      let color: string = this.__chartService.getSingleColor(i, linesLen, this.__customColors);

      this.__series[i] = {
        color,
      }

      
      let selectionIndex: number = this.__toolTipParserFn ? (i * 2) + 1 : i + 1;
      let selected: boolean = this.__selectedLineIndex === selectionIndex;
      if (this.__showPoints === 'selected' && selected) {
        this.__series[i].pointsVisible = true;
      }

      lines.push({
        label: colName,
        index: selectionIndex,
        color,
        selected,
        select: () => {

          this.selectedLineIndex = selectionIndex;
          this.selectedPointIndex = null;
          return;
        }
      })

    }

    this.__lines = lines;
    let maxVal: number = 0;
    let minVal: number = 0;

    let pointsLen: number = data.xAxis.points.length;
    for (let i = 0; i < pointsLen; i++) {

      const singlePoint = data.xAxis.points[i];

      let pointVal: string = typeof singlePoint === 'number' ? singlePoint.toString() : singlePoint;
      let row: any[] = [];

      if (this.__continous) {
        
        row.push(i);
        ticks.push({
          v: i,
          f: pointVal
        })

      } else {
        row.push(pointVal);
      }

      for (let j = 0; j < linesLen; j++) {
        const lineName = linesCols[j];
        let lineVal: number | null = data.lines[lineName][i];
        lineVal = (typeof lineVal === 'number') ? lineVal : null;
        row.push(lineVal);

        if (lineVal > maxVal) {
          maxVal = lineVal;
        }
        
        if (lineVal < minVal) {
          minVal = lineVal;
        }

        if (this.__toolTipParserFn) {
          row.push(this.__toolTipParserFn(lineVal, singlePoint, lineName));
        }
      }

      dataTable.addRow(row);

    }

    this.__minVal = minVal;
    this.__maxVal = (maxVal / 100) * 101;

    this.__ticks = ticks;
    this.__dataTable = dataTable;

  }

  private __parseOptions(): any {

    let parentWidth = this.parentElm.nativeElement.offsetWidth;
    let parentHeight = this.parentElm.nativeElement.offsetHeight;

    let options = {
      backgroundColor: 'transparent',
      legend: { position: 'none' },
      chartArea: {
        backgroundColor: 'transparent',
        width: '95%',
        height: '90%',
      },
      curveType:  this.__curved ? 'function' : undefined,
      width: parentWidth,
      height: parentHeight,
      hAxis: {
        textStyle: {
          color: this.__chartService.getLineChartTextColor(),
        },
        gridlines: { // smaller 
          color: 'transparent'
        },
        ticks: this.__continous ? this.__ticks : undefined,
      },
      pointsVisible: this.__showPoints === 'all',
      vAxis: {
        textStyle: {
          color: this.__chartService.getLineChartTextColor(),
        },       
        minorGridlines: { // smaller 
          color: 'transparent',
        },
        gridlines: { // smaller 
          color: this.__chartService.getGridLineColor(),
          count: 5
        },
        maxValue: this.__maxVal,
        minValue: this.__minVal,
        ticks: this.__showVerAxis ? undefined : []
      },
      baselineColor: this.__chartService.getLineChartTextColor(),
      series: this.__series,
      axisTitlesPosition: 'none',
      fontName: 'Roboto'
    };

    return options;

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

export interface Line {
  index: number,
  color: string,
  label: string,
  selected: boolean,
  select: () => void
}

interface Serie {
  color: string,
  pointsVisible?: boolean 
}

export type ToolTipParserFn = (value: number, axixPoint: number | string, lineName: string) => string;

export interface LineChartData {
  xAxis: {
    label: string,
    points: (string | number)[]
  },
  lines: { [key: string]: (number | null)[] }
}

type Ticks = { v: number, f: string }[]; 