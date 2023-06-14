import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaCadastroFormComponent } from './guia-cadastro-form.component';

describe('GuiaCadastroFormComponent', () => {
  let component: GuiaCadastroFormComponent;
  let fixture: ComponentFixture<GuiaCadastroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaCadastroFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaCadastroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
