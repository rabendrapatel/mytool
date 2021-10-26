import { Pipe, PipeTransform } from '@angular/core';
import { DefaultTruncatePipe } from '@handy-ng/core/defaults/pipes/truncate.pipe';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe extends DefaultTruncatePipe implements PipeTransform {}