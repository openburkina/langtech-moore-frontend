import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCategorieComponent } from './create-update-categorie.component';

describe('CreateUpdateCategorieComponent', () => {
  let component: CreateUpdateCategorieComponent;
  let fixture: ComponentFixture<CreateUpdateCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
