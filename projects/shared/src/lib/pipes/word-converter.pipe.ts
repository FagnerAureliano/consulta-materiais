import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordConverter',
})
export class WordConverterPipe implements PipeTransform {
  private wordsCorrected: { [key: string]: string } = {
    geral: 'Geral',
    saude: 'Saúde',
    logistica: 'Logística',
    educacao: 'Educação',
    pessoal: 'Pessoal',
    'defesa-cibernética': 'Defesa Cibernética',
    sau: 'SAU',
    ensino: 'Ensino',
    'e-siscult': 'E-SISCULT',
    sigadaer: 'SIGADAER',
    bi: 'BI',
    fabmail: 'FABMAIL',
    operacional: 'Operacional',
    siplorc: 'SIPLORC',
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
