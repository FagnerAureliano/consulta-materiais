import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoCadastroContainerComponent } from './documento-cadastro-container.component';

describe('DocumentoCadastroContainerComponent', () => {
  let component: DocumentoCadastroContainerComponent;
  let fixture: ComponentFixture<DocumentoCadastroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoCadastroContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoCadastroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
