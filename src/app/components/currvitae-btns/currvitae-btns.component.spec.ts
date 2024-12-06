import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrvitaeBtnsComponent } from './currvitae-btns.component';

describe('CurrvitaeBtnsComponent', () => {
  let component: CurrvitaeBtnsComponent;
  let fixture: ComponentFixture<CurrvitaeBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrvitaeBtnsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrvitaeBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
