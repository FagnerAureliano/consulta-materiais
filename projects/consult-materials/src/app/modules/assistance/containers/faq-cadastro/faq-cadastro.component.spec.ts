import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCadastroComponent } from './faq-cadastro.component';

describe('FaqCadastroComponent', () => {
  let component: FaqCadastroComponent;
  let fixture: ComponentFixture<FaqCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
