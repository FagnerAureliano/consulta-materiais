import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsLinksContainerComponent } from './materials-links-container.component';

describe('MaterialsLinksContainerComponent', () => {
  let component: MaterialsLinksContainerComponent;
  let fixture: ComponentFixture<MaterialsLinksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsLinksContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsLinksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
