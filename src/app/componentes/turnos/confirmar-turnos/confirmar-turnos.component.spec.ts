import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarTurnosComponent } from './confirmar-turnos.component';

describe('ConfirmarTurnosComponent', () => {
  let component: ConfirmarTurnosComponent;
  let fixture: ComponentFixture<ConfirmarTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
