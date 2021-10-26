import { Directive, HostListener, Output, EventEmitter, Input, Renderer2, ElementRef, OnInit, OnDestroy, ViewChild, ContentChildren, AfterContentInit } from '@angular/core';
import { FileUploadDirective } from './file-upload.directive';
import { Subscription } from 'rxjs';
import { HandyNgUtilsService } from '@handy-ng/services';

@Directive({
  selector: '[uploadDrag]'
})
export class UploadDragDirective implements OnInit, OnDestroy {

  @Output('filesDrop') public filesDrop: EventEmitter<File[]> = new EventEmitter();
  @Output('dragEvent') public dragEvent: EventEmitter<'enter' | 'leave' | 'drop'> = new EventEmitter();

  @Input('uploadHandler') public _finalListener: FileUploadDirective;

  @Input('dragOverClass') public dragOverClass: string;

  private _dragOver: boolean = false;
  private _dragEventSub: Subscription;

  private _disabled: boolean = false;
  @Input('disabledUpload') public set disabledUpload(disabled: boolean) {
    this._disabled = disabled;
  }

  private _disabledCheckInterval: NodeJS.Timeout;

  constructor (private _renderer: Renderer2, private _parentElm: ElementRef, private _handyNgUtilsService: HandyNgUtilsService) { }

  ngOnInit(): void {

    if (this._finalListener) {

      this._disabledCheckInterval = setInterval(() => {
        
        this.disabledUpload = this._finalListener.disabled;  

      }, 500);

    }

    this._handleDragEventSub();

  }

  private _handleDragEventSub(): void {

    this._dragEventSub = this.dragEvent.subscribe(event => {

      if (event === 'enter') {

        this._dragOver = true;

        if (this.dragOverClass) {
          this._renderer.addClass(this._parentElm.nativeElement, this.dragOverClass);
        }

      }

      if (event === 'leave' || event === 'drop') {

        this._dragOver = false;

        if (this.dragOverClass) {
          this._renderer.removeClass(this._parentElm.nativeElement, this.dragOverClass);
        }

      }

    })

  }

  @HostListener('drop', ['$event'])
  filesDroped($event) {

    $event.preventDefault();

    if (this._disabled) {
      return;
    }

    let files = $event.dataTransfer.files;

    this.filesDrop.emit(files);
    this.dragEvent.emit('drop');

    if (this._finalListener) {
      this._finalListener.setFilesAndUpload(files);
    }

  }

  @HostListener('dragover', ['$event'])
  dragOver($event) {

    $event.preventDefault();

    if (this._disabled) {
      return;
    }

    if (!this._dragOver) {
      this.dragEvent.emit('enter');
    }

  }

  @HostListener('dragleave', ['$event'])
  dragLeave($event) {

    if (this._dragOver) {
      this.dragEvent.emit('leave');
    }

  }

  ngOnDestroy() {
    
    this._handyNgUtilsService.unsubscribeAll([
      this._dragEventSub
    ])

    if (this._disabledCheckInterval) {
      clearInterval(this._disabledCheckInterval);
    }

  }

}
