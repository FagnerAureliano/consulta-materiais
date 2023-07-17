import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordConverter',
})
export class WordConverterPipe implements PipeTransform {
  private wordsCorrected: { [key: string]: string } = {
    'orcamento': 'Orçamento',
    'saude': 'Saúde',
    'logistica': 'Logística',
    'educacao': 'Educação',
  };

  transform(word: string): string {
    if (word) {
      const lowerCaseWord = word.toLowerCase();
      if (this.wordsCorrected.hasOwnProperty(lowerCaseWord)) {
        return this.wordsCorrected[lowerCaseWord];
      }
      return word;
    }
    return word;
  }
}
