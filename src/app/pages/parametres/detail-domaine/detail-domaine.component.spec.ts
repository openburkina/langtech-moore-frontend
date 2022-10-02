import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDomaineComponent } from './detail-domaine.component';

describe('DetailDomaineComponent', () => {
  let component: DetailDomaineComponent;
  let fixture: ComponentFixture<DetailDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDomaineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
