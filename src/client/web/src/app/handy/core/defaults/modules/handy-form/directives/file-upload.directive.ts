import { Directive, Renderer2, OnInit, ElementRef, HostListener, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HandyNgUtilsService, HandyNgConfigService, HandyNgApiService, HandyNgUserService } from '@handy-ng/services';
import { SingleOrArrayCombo, FileInputData } from '@handy-ng/types';
import * as mime from 'mime';
import { HttpEventType } from '@angular/common/http';
import { ServerAllowedExt, FileAccessRules } from '@handy-ng/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fileUpload]',
  exportAs: 'fileUpload',
})
export class FileUploadDirective implements OnInit, OnDestroy {

  private _fileInput: Element;
  private _files: File[] = [];

  private _multiple: boolean = false;
  @Input('allowedFileTypes') public allowedFileTypes: SingleOrArrayCombo<ServerAllowedExt> = this._handyNgConfigService.data.fileUpload.allowedFileTypes;
  @Input('thumbs') public thumbs: string | string[];
  @Input('accessRules') public accessRules: Omit<FileAccessRules, 'password'>;

  private _maxFiles: number = 1;
  @Input('maxFiles') public set maxFiles(maxFiles: number) {

    this._maxFiles = maxFiles;

    this._multiple = this._maxFiles > 1;
    
    if (this._fileInput) {

      if (this._maxFiles > 1) {
        
        this._multiple = true;
        this._renderer.setAttribute(this._fileInput, 'multiple', 'true');
        return;
        
      }
      
      this._multiple = false;
      this._renderer.removeAttribute(this._fileInput, 'multiple');

    }

  }

  @Output('uploadEvent') public generatlUploadEvent: EventEmitter<GeneralUploadEvent> = new EventEmitter<GeneralUploadEvent>();
  @Output('uploadProgress') public progressEvent: EventEmitter<{ finished: boolean, files: FileInputData[] }> = new EventEmitter();
  @Output('uploadStart') public uploadStartedEvent: EventEmitter<FileInputData[]> = new EventEmitter();
  @Output('uploadFinished') public uploadFinishedEvent: EventEmitter<FileInputData[]> = new EventEmitter();

  @Output('dragEvent') public dragEvent: EventEmitter<'enter' | 'leave' | 'drop'> = new EventEmitter();
  @Input('dragOverClass') public dragOverClass: string;

  private _disabled: boolean = false;
  @Input('disabled') public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  
  @Input('disabledUpload') public set disabledUpload(disabled: boolean) {
    this._disabled = disabled;
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  
  private _dragEventSub: Subscription;

  private _dragOver: boolean = false;

  private _uploadProgress: FileInputData[] = [];
  private _uploadSizeLimit: number = this._handyNgConfigService.data.fileUpload.maxFileSizeInMB * 1024 * 1024;

  constructor (
    private _renderer: Renderer2,
    private _parentElm: ElementRef,
    private _handyNgUtilsService: HandyNgUtilsService,
    private _handyNgApiService: HandyNgApiService,
    private _handyNgUserService: HandyNgUserService,
    private _handyNgConfigService: HandyNgConfigService) {

  }

  ngOnInit() {

    this._createFileInput();
    setTimeout(() => {
      this._handleDragEventSub();
    })

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

  private _createFileInput(): void {

    if (this._handyNgConfigService.isPlatform('server')) {
      return;
    }

    let uploadId: string = this._handyNgUtilsService.generateHash({ emptySpace: false, specialChars: false });
    let tempInput: Element = this._renderer.createElement('input');

    this._renderer.setStyle(tempInput, 'display', 'none');
    this._renderer.setAttribute(tempInput, 'type', 'file');
    this._renderer.setAttribute(tempInput, 'id', uploadId);
    this._renderer.setAttribute(tempInput, 'accept', this._getAcceptAttrString());

    if (this._multiple) {
      this._renderer.setAttribute(tempInput, 'multiple', 'true');
    }

    this._renderer.appendChild(this._parentElm.nativeElement, tempInput);
    this._fileInput = document.getElementById(uploadId);
    this._addChangeEventListener();

  }

  private _getAcceptAttrString(): string {

    let result: string = '';

    let accepted: ServerAllowedExt[] = (Array.isArray(this.allowedFileTypes)) ? this.allowedFileTypes : [this.allowedFileTypes];
    let acceptedLen: number = accepted.length;
    let sanitizedAccepted: ServerAllowedExt[] = [];

    for (let i = 0; i < acceptedLen; i++) {
      const singleAccepted = accepted[i];

      if (this._handyNgConfigService.data.fileUpload.allowedFileTypes.includes(singleAccepted)) {

        result += `.${singleAccepted},`;
        sanitizedAccepted.push(singleAccepted);

      } else {
        console.error(`Upload of ${singleAccepted} files are not supported`);
      }

    }

    this.allowedFileTypes = sanitizedAccepted;

    if (result.endsWith(',')) {
      result = this._handyNgUtilsService.replaceLastCharOfString(result);
    }

    return result;

  }

  private _addChangeEventListener(): void {

    this._fileInput.addEventListener('change', (event: any) => {

      let { files = [] } = event.target;
      this.setFilesAndUpload(files)

    })

  }

  private _uploadFile(file: File): void {

    let fileType: ServerAllowedExt = this._getFileType(file);

    this._uploadProgress.push({
      _id: null,
      progress: 0,
      finished: false,
      error: null,
      fileType: fileType,
      originalFileName: file.name,
      url: null
    })

    let index: number = this._uploadProgress.length - 1;

    if (this._uploadSizeLimit < file.size) {

      let error: string = `File is too large. Limit is ${this._handyNgConfigService.data.fileUpload.maxFileSizeInMB}MB`;

      this._handyNgUserService.notify.errNotification({
        headline: `${file.name} upload failed`,
        msg: error
      });

      this._uploadProgress[index].progress = 100;
      this._uploadProgress[index].error = error;
      this._uploadProgress[index].finished = true;
      this._triggerProgressEvent();

      return;

    }

    if (!this.allowedFileTypes.includes(fileType)) {

      let error: string = `"${fileType}" files are not supported`;

      this._handyNgUserService.notify.errNotification({
        headline: `${file.name} upload failed`,
        msg: error
      });

      this._uploadProgress[index].progress = 100;
      this._uploadProgress[index].error = error;
      this._uploadProgress[index].finished = true;
      this._triggerProgressEvent();

      return;

    }

    if (<any>fileType === 'unknown') {

      let error: string = `Unknown file type`;

      this._handyNgUserService.notify.errNotification({
        headline: `${file.name} upload failed`,
        msg: error
      });

      this._uploadProgress[index].progress = 100;
      this._uploadProgress[index].error = error;
      this._uploadProgress[index].finished = true;
      this._triggerProgressEvent();

      return;

    }

    this._handyNgApiService.fileUpload(file, fileType as ServerAllowedExt, this.accessRules, this.thumbs).subscribe(uploadEvent => {

      let eventType: HttpEventType = uploadEvent['type'];
      if (eventType === HttpEventType.UploadProgress) {

        this._uploadProgress[index].progress = Math.round(uploadEvent['loaded'] / uploadEvent['total'] * 100);
        this._triggerProgressEvent();

      }

      if (eventType === HttpEventType.Response) {

        let { fileType, _id, url, originalFileName, thumbs } = uploadEvent['body'].data;

        this._uploadProgress[index].fileType = fileType;
        this._uploadProgress[index]._id = _id;
        this._uploadProgress[index].url = url;
        this._uploadProgress[index].originalFileName = originalFileName;
        this._uploadProgress[index].thumbs = thumbs;
        this._uploadProgress[index].progress = 100;
        this._uploadProgress[index].finished = true;
        this._triggerProgressEvent();

      }

    }, err => {

      this._handyNgUserService.notify.apiErrNotification(err);

      this._uploadProgress[index].progress = 100;
      this._uploadProgress[index].finished = true;
      this._uploadProgress[index].error = 'Server error';

      this._triggerProgressEvent();

    })

  }

  private _startUpload(): void {

    let filesLen: number = this._files.length;

    // ? Looks stupid, but blocks from acidental drop of uploaded thumb.... 
    if (filesLen < 1) {
      return;
    }

    if (filesLen > this._maxFiles) {

      this._handyNgUserService.notify.errNotification({
        headline: 'Max files limit',
        msg: `You can upload max ${this._maxFiles} file${(this._maxFiles > 1) ? 's' : ''}`
      })

      this._resetUpload();
      return;

    }

    for (let i = 0; i < filesLen; i++) {

      const singleFile = this._files[i];
      this._uploadFile(singleFile);

    }

    this.generatlUploadEvent.emit({
      type: 'start',
      finished: false,
      files: this._uploadProgress
    })

    this.uploadStartedEvent.emit(this._uploadProgress);

  }

  private _getFileType(file: File): ServerAllowedExt {

    let mimetype: string = (file.type) ? file.type : mime.getType(file.name);
    let ext: ServerAllowedExt;

    if (mimetype) {

      ext = mime.getExtension(mimetype) as ServerAllowedExt;

    }

    if (ext) {
      return ext;
    }

    return 'unknown' as ServerAllowedExt;

  }

  public triggerUploadDialog() {

    if (this._handyNgConfigService.isPlatform('server') || this._fileInput === undefined || this._disabled) {
      return;
    }

    let event = new MouseEvent('click');
    this._fileInput.dispatchEvent(event);

  }

  public setFilesAndUpload(files: File[] = []): void {

    if (this.disabled) {
      return;
    }

    if (this._files.length > 0) {

      this._handyNgUserService.notify.errNotification({
        headline: `Previous upload hasn't finished yet`,
        msg: 'You can repeat upload after the previous upload is finished'
      })

      return;

    }

    this._files = files;
    this._startUpload();

  }

  private _triggerProgressEvent(): void {

    let filesLen: number = this._uploadProgress.length;
    let finished: boolean = filesLen > 0;

    for (let i = 0; i < filesLen; i++) {
      const singleFile = this._uploadProgress[i];

      if (!singleFile.finished) {

        finished = false;
        break;

      }

    }

    this.progressEvent.emit({
      finished,
      files: this._uploadProgress
    })

    this.generatlUploadEvent.emit({
      type: 'progress',
      finished,
      files: this._uploadProgress
    })

    if (finished) {
      this._triggerUploadFinishEvent()
    }

  }

  private _triggerUploadFinishEvent(): void {

    let hasErr: boolean = false;

    let filesLen: number = this._uploadProgress.length;
    for (let i = 0; i < filesLen; i++) {

      const singleFile = this._uploadProgress[i];

      if (singleFile.error) {

        hasErr = true;
        break;

      }

    }

    this.generatlUploadEvent.emit({
      type: 'finish',
      finished: true,
      files: this._uploadProgress
    })

    this.uploadFinishedEvent.emit(this._uploadProgress);
    this._resetUpload();

    if (!hasErr) {
      this._handyNgUserService.notify.simpleMsgNotification({
        headline: 'Upload finished'
      })
    }

  }

  private _resetUpload(): void {

    this._createFileInput();
    this._uploadProgress = [];
    this._files = [];

  }

  @HostListener('click', ['$event.target'])
  hostClick() {

    if (this._disabled) {
      return;
    }

    this.triggerUploadDialog();

  }

  @HostListener('drop', ['$event'])
  filesDrop($event) {

    $event.preventDefault();

    if (this._disabled) {
      return;
    }

    this.dragEvent.emit('drop');
    this.dragEvent.emit('leave');
    this._files = $event.dataTransfer.files;
    this._startUpload()

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

  }

}

export interface GeneralUploadEvent { 
  type: 'start' | 'progress' | 'finish', 
  finished: boolean, 
  files: FileInputData[] 
}