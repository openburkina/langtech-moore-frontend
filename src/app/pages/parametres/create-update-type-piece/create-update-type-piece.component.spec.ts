import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTypePieceComponent } from './create-update-type-piece.component';

describe('CreateUpdateTypePieceComponent', () => {
  let component: CreateUpdateTypePieceComponent;
  let fixture: ComponentFixture<CreateUpdateTypePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateTypePieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTypePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
