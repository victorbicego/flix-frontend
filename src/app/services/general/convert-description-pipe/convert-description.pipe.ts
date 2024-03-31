import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDescription',
  standalone: true,
})
export class ConvertDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    let descriptionWithBr = value.replace(/\\n/g, '<br>');
    const regex =
      /(?:https?:\/\/[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]?)/g;
    let descriptionWithLinks = descriptionWithBr.replace(
      regex,
      '<a href="$&" target="_blank" class="description-link">$&</a>'
    );
    return descriptionWithLinks;
  }
}
