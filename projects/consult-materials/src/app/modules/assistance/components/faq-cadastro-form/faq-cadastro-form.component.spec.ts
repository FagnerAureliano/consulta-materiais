import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCadastroFormComponent } from './faq-cadastro-form.component';

describe('FaqCadastroFormComponent', () => {
  let component: FaqCadastroFormComponent;
  let fixture: ComponentFixture<FaqCadastroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqCadastroFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCadastroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
