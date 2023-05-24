import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaCadastroContainerComponent } from './guia-cadastro-container.component';

describe('GuiaCadastroContainerComponent', () => {
  let component: GuiaCadastroContainerComponent;
  let fixture: ComponentFixture<GuiaCadastroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaCadastroContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaCadastroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
