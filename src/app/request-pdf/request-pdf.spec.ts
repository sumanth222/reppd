import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPdf } from './request-pdf';

describe('RequestPdf', () => {
  let component: RequestPdf;
  let fixture: ComponentFixture<RequestPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
