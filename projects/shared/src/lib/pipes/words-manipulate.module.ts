import { NgModule } from '@angular/core';
import { WordConverterPipe } from './word-converter.pipe';
import { TruncatePipe } from './truncate.pipe';

const PIPES = [TruncatePipe, WordConverterPipe];

@NgModule({
  declarations: [PIPES],
  exports: [PIPES],
})
export class WordsManipulateModule {}
