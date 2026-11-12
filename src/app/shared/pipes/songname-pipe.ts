import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songname',
})
export class SongnamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
