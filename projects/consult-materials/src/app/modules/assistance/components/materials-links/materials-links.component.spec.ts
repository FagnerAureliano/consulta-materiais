import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsLinksComponent } from './materials-links.component';

describe('MaterialsLinksComponent', () => {
  let component: MaterialsLinksComponent;
  let fixture: ComponentFixture<MaterialsLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
