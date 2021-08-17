import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  a = [
    '',
    'un ',
    'deux ',
    'trois ',
    'quatre ',
    'cinq ',
    'six ',
    'sept ',
    'huit ',
    'neuf ',
    'dix ',
    'onze ',
    'douze ',
    'treize ',
    'quatorze ',
    'quinze ',
    'seize ',
    'dix sept ',
    'dix huit ',
    'dix neuf '];

  b = [
    '',
    '',
    'vingt',
    'trente',
    'quarante',
    'cinquante',
    'soixante',
    'soixante-dix',
    'quatre-vingts',
    'quatre-vingts-dix'];

  transform(value: any, args?: any): any {
    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9)  { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) {return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'milliard ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'millions ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'mille ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'cent ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
        (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
        this.a[n[5][1]]) + 'euro' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}