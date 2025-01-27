import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCardFullComponent } from './education-card-full.component';

describe('EducationCardFullComponent', () => {
  let component: EducationCardFullComponent;
  let fixture: ComponentFixture<EducationCardFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationCardFullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationCardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
