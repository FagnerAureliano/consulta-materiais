import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoCadastroFormComponent } from './documento-cadastro-form.component';

describe('DocumentoCadastroFormComponent', () => {
  let component: DocumentoCadastroFormComponent;
  let fixture: ComponentFixture<DocumentoCadastroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoCadastroFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoCadastroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
