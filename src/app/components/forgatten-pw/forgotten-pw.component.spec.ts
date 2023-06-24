import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgattenPwComponent } from './forgotten-pw.component';

describe('ForgattenPwComponent', () => {
  let component: ForgattenPwComponent;
  let fixture: ComponentFixture<ForgattenPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgattenPwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgattenPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
