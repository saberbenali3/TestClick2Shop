import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvResultComponent } from './csv-result.component';

describe('CsvResultComponent', () => {
  let component: CsvResultComponent;
  let fixture: ComponentFixture<CsvResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsvResultComponent]
    });
    fixture = TestBed.createComponent(CsvResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
