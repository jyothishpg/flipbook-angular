import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse', pure: false,
    standalone: false
})
export class ReversePipe implements PipeTransform {
  transform(values) {
    if (values) {
      return values.slice().reverse();
    }
  }
}
