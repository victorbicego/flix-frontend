import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDescription',
  standalone: true,
})
export class ConvertDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    let descriptionWithBr = value.replace(/\n/g, '<br>');
    return descriptionWithBr;
  }
}
