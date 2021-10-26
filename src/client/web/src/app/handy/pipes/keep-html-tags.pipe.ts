import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DefaultKeepHtmlTagsPipe } from '../core/defaults/pipes/keep-html-tags.pipe';

@Pipe({
  name: 'keepHtmlTags'
})
@Injectable({
  providedIn: 'root'
})
export class KeepHtmlTagsPipe extends DefaultKeepHtmlTagsPipe implements PipeTransform { }
