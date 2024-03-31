import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDuration',
  standalone: true,
})
export class ConvertDurationPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (value == null) {
      return null;
    }

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    const matchHour = value.match(/(\d+H)/)!;
    const matchMinute = value.match(/(\d+M)/)!;
    const matchSecond = value.match(/(\d+(?:\.\d+)?)S/)!;
    if (matchHour) {
      hours = parseInt(matchHour[1], 10);
    }

    if (matchMinute) {
      minutes = parseInt(matchMinute[1], 10);
    }

    if (matchSecond) {
      seconds = parseInt(matchSecond[1], 10);
    }

    let duration = '';

    if (seconds < 9) {
      duration = duration + '0' + seconds;
    } else {
      duration = duration + seconds;
    }

    if (minutes != 0) {
      if (minutes < 9) {
        duration = '0' + minutes + ':' + duration;
      } else {
        duration = minutes + ':' + duration;
      }
    }

    if (hours != 0) {
      duration = hours + ':' + duration;
    }

    return duration;
  }
}
