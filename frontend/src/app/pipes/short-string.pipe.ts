import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'shortString'})
export class ShortString implements PipeTransform {
    transform(value: string): string {
        if (value != null) {
            if (value.length > 20) {
                return value.slice(0, 20) + '...';
            } else {
                return value;
            }
        }
    }
  }
