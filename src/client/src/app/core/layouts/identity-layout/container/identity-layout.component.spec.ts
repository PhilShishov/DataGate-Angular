import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityLayoutComponent } from './identity-layout.component';

describe('IdentityLayoutComponent', () => {
  let component: IdentityLayoutComponent;
  let fixture: ComponentFixture<IdentityLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
