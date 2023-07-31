import { TestBed } from '@angular/core/testing';

import { CadastroResolver } from './cadastro.resolver';

describe('CadastroResolver', () => {
  let resolver: CadastroResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CadastroResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
