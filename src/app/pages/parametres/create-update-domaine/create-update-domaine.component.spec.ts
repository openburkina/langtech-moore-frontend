import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateDomaineComponent } from './create-update-domaine.component';

describe('CreateUpdateDomaineComponent', () => {
  let component: CreateUpdateDomaineComponent;
  let fixture: ComponentFixture<CreateUpdateDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateDomaineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
