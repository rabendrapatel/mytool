import { Component, OnInit, Input, Optional } from '@angular/core';
import { HandyFileInputData, PublicConfigData } from '@handy-ng/types';
import { HandyFileInputComponent } from '@handy-ng/modules/handy-form/components/handy-file-input/handy-file-input.component';
import { HandyNgConfigService } from '@handy-ng/services';

@Component({
  selector: 'file-thumb',
  templateUrl: './file-thumb.component.html',
  styleUrls: ['./file-thumb.component.scss']
})
export class FileThumbComponent implements OnInit {

  @Input('file') public file: HandyFileInputData[number];
  @Input('thumb') public thumb: string;

  public fileTypeThumbsIcons: PublicConfigData['fileUpload']['fileTypeThumbsIcons'] = this._handyNgConfigService.data.fileUpload.fileTypeThumbsIcons;
  public imgThumbIconPlaceholder: PublicConfigData['fileUpload']['imgThumbIconPlaceholder'] = this._handyNgConfigService.data.fileUpload.imgThumbIconPlaceholder;
  public loadingImageIcon: PublicConfigData['fileUpload']['loadingImageIcon'] = this._handyNgConfigService.data.fileUpload.loadingImageIcon;
  public imgFileTypes: PublicConfigData['fileUpload']['imgFileTypes'] = this._handyNgConfigService.data.fileUpload.imgFileTypes;

  public isImg: boolean = false;
  public icon: string = this.fileTypeThumbsIcons.rest;
  public ext: string;
  public preExt: string;

  constructor (@Optional() public fileInput: HandyFileInputComponent, private _handyNgConfigService: HandyNgConfigService) {

   }

  ngOnInit(): void {

    this._setIcon();
    this._setExtStrings();

  }

  protected _setIcon(): void {

    let { fileType } = this.file;

    this.isImg = this.imgFileTypes.includes(fileType as any) || fileType === 'svg';

    if (this.isImg) {

      this.icon = this.loadingImageIcon;
      return;

    }

    this.icon = (this.fileTypeThumbsIcons[fileType] !== undefined) ? this.fileTypeThumbsIcons[fileType] : this.fileTypeThumbsIcons.rest;
    
    return;

  }

  protected _setExtStrings(): void {

    let splitted: string[] = this.file.originalFileName.split('.');
    let splittedLen: number = splitted.length;

    if (splittedLen < 2) {

      this.preExt = this.file.originalFileName;
      return;

    }

    let finalLen: number = splittedLen - 1;
    this.ext = splitted[finalLen];
    splitted.length = finalLen;

    this.preExt = splitted.join('.');

  }

  public removeFile(): void {

    if (this.fileInput) {
      this.fileInput.removeFile(this.file._id);
    }

  }

  public openFileInNewTab(): void {

    if (this._handyNgConfigService.isPlatform('server')) {
      return;
    }

    window.open(this.file.url, '_blank');

  }
  
  public downLoadFile(): void {

    if (this._handyNgConfigService.isPlatform('server')) {
      return;
    }

    window.open(this.file.url + '?download=true');

  }

}
