import { HandyNgUserService, HandyNgLayoutService, HandyNgUtilsService } from '@handy-ng/services';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef, Renderer2, AfterContentInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'handy-form',
  templateUrl: './handy-form.component.html',
  styleUrls: ['./handy-form.component.scss'],
  providers: []
})
export class HandyFormComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() public formGroup: FormGroup;
  @Input() public formName: string;
  @Input() public rememberState: boolean = true;
  @Input() public disablePin: boolean = false;
  @Input() public autoSubmitDisabling: boolean = true;
  @Input() public disableSubmitOnInvalid: boolean = true;
  @Input() public disableSubmitOnPending: boolean = true;
  @Input() public defaultResetBtn: boolean = true;
  @Input() public debounceTime: number = 0;

  @Input() public hideFormOptions: boolean = false;

  // public isFullScreen: boolean = false;
  @Input() public allowFullScreen: boolean = true;
  protected fullScreenClassName: string = 'full-screen-handy-form';

  @Output() public submitEvent: EventEmitter<{ status: FormStatus, formValue: any }> = new EventEmitter();
  @Output() public validSubmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() public invalidSubmitEvent: EventEmitter<{ errors: any, formValue: any, status: FormStatus }> = new EventEmitter();
  @Output() public resetEvent: EventEmitter<void> = new EventEmitter();

  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Output() public statusChange: EventEmitter<FormStatus> = new EventEmitter();
  @Output() public submitDisabledChange: EventEmitter<boolean> = new EventEmitter();

  public internalEvents: Subject<InternalEventsList> = new Subject();

  private __resetBtn: ElementRef;
  private __submitBtn: ElementRef;
  private __submitBtnDisabled: boolean = false;
  private __pending: boolean = false;
  private __valid: boolean = false;

  private _pinningState: boolean = false;

  public get pinningState(): boolean {
    return this._pinningState;
  }

  public get pending(): boolean {
    return this.__pending;
  }

  public get valid(): boolean {
    return this.__valid;
  }

  public get disabled(): boolean {
    return this.__submitBtnDisabled;
  }

  private formChangeSubscription: Subscription;
  private formStateChangeSubscription: Subscription;
  private formMemoryStateSubscription: Subscription;

  private _routerSubscription: Subscription;

  private __submitEvent: Subject<void> = new Subject();
  private __resetEvent: Subject<void> = new Subject();

  constructor (
    protected formEl: ElementRef,
    protected _router: Router,
    public _handyNgUserService: HandyNgUserService,
    public handyNgLayoutService: HandyNgLayoutService,
    private _handyNgUtilsService: HandyNgUtilsService,
    protected renderer: Renderer2) { }

  ngOnInit(): void {

    this._routerSubscription = this._router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        this.exitFullScreen();
      }

    })

    this.formChangeSubscription = this.formGroup.valueChanges.pipe(debounceTime(this.debounceTime)).subscribe(change => {

      this.valueChange.emit(this.formGroup.getRawValue());

    })

    if (this.rememberState && this.formName) {

      this.formMemoryStateSubscription = this.formGroup.valueChanges.pipe(debounceTime(2000)).subscribe(change => {

        this._handyNgUserService.saveFormStateVal(this.formName, this.formGroup.getRawValue());

      })

    }

    this.formStateChangeSubscription = this.formGroup.statusChanges.pipe(debounceTime(this.debounceTime)).subscribe(() => {

      switch (this.formGroup.status as FormStatus) {

        case 'VALID':

          this.__valid = true;
          this.__pending = false;
          this.enableSubmit();

          break;

        case 'PENDING':

          this.__valid = false;
          this.__pending = true;
          this.disableSubmit();

          break;

        case 'INVALID':

          this.__valid = false;
          this.__pending = false;
          this.disableSubmit();

          break;

        case 'DISABLED':

          this.__valid = false;
          this.__pending = false;
          this.disableSubmit();

          break;

        default:
          break;
      }


      this.statusChange.emit(this.formGroup.status as FormStatus);
    })

    this.__submitEvent.pipe(debounceTime(this.debounceTime)).subscribe(() => {

      this.internalEvents.next('submit');

      this.emitSubmitEvents();
      if (this.__valid) {

        this.exitFullScreen();
        this.clearStateMemory();

      }

    })

    this.__resetEvent.subscribe(() => {

      this.formGroup.reset();
      this.internalEvents.next('valueReset');
      this.resetEvent.emit();

      this.clearStateMemory();

    })

  }

  ngAfterContentInit(): void {

    this.__submitBtn = this.formEl.nativeElement.querySelector('[type="submit"]');

    if (this.__submitBtn) {
      this.renderer.listen(this.__submitBtn, 'click', () => {

        this.triggerSubmit();

      })
    }

    this.__resetBtn = this.formEl.nativeElement.querySelector('[type="reset"]');

    if (this.__resetBtn) {
      this.renderer.listen(this.__resetBtn, 'click', () => {

        this.triggerReset();

      })
    }

  }

  public triggerSubmit(): void {

    this.__submitEvent.next();

  }

  public triggerReset(): void {

    this.__resetEvent.next();

  }

  public disableSubmit(): void {

    if (this.__submitBtnDisabled) {
      return;
    }

    this.__submitBtnDisabled = true;
    this.__switchSubmitRefDisableState();

  }

  public enableSubmit(): void {

    if (!this.__submitBtnDisabled) {
      return;
    }

    this.__submitBtnDisabled = false;
    this.__switchSubmitRefDisableState();

  }

  private __switchSubmitRefDisableState(): void {

    this.submitDisabledChange.emit(this.__submitBtnDisabled);

    if (!this.__submitBtn || !this.autoSubmitDisabling) {
      return;
    }

    if (this.__submitBtnDisabled) {
      this.renderer.setAttribute(this.__submitBtn, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.__submitBtn, 'disabled');
    }

  }

  private emitSubmitEvents(): void {

    let { status, errors } = this.formGroup;
    let value: any = this.formGroup.getRawValue();

    this.submitEvent.emit({ status: status as FormStatus, formValue: value });

    if (status === 'VALID') {
      this.validSubmitEvent.emit(value);
      return;
    }

    this.invalidSubmitEvent.emit({ status: status as FormStatus, formValue: value, errors });
    return;

  }

  private clearStateMemory(): void {

    if (this.rememberState && this.formName) {
      this._handyNgUserService.resetFormStateVal(this.formName);
    }

  }

  public toggleFormPinning(): void {

    this._pinningState = !this._pinningState;
    this.internalEvents.next('pinningState');

  }

  public showAllErrors(): void {
    this.internalEvents.next('showFieldsErrors');
  }

  public exitFullScreen(): void {

    if (!this.handyNgLayoutService.isFullScreenForm) {
      return;
    }

    this.toogleFullScreen();

  }

  public toogleFullScreen(): void {


    //ion
    // this._handyNgUserService.isFullScreenOrNot(this.isFullScreen);

    this.handyNgLayoutService.toogleFullScreenForm();
    // this.isFullScreen = this.handyNgLayoutService.isFullScreenForm;

    //
    if (this.handyNgLayoutService.isFullScreenForm) {
      this.renderer.addClass(this.formEl.nativeElement, this.fullScreenClassName);
      return;
    }

    this.renderer.removeClass(this.formEl.nativeElement, this.fullScreenClassName);

  }

  @HostListener('keydown', ['$event']) 
  enterSubmit(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.triggerSubmit();      
    }
    
  }

  @HostListener('document:keydown.escape', ['$event']) 
  onEscPress(event: KeyboardEvent) {
    this.exitFullScreen();
  }

  ngOnDestroy(): void {

    this._handyNgUtilsService.unsubscribeAll([
      this._routerSubscription,
      this.formChangeSubscription,
      this.formStateChangeSubscription,
      this.formMemoryStateSubscription,
    ])

    this._handyNgUtilsService.completeAllSubjects([
      this.__submitEvent,
      this.__resetEvent
    ])

    this.onEscPress = () => {};

  }


}
type FormStatus = 'VALID' | 'INVALID' | "PENDING" | 'DISABLED';
type InternalEventsList = 'pinningState' | 'valueReset' | 'loadPinnedVal' | 'submit' | 'showFieldsErrors';
