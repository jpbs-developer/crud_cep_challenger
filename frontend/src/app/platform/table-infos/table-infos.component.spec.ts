import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfosComponent } from './table-infos.component';

describe('TableInfosComponent', () => {
  let component: TableInfosComponent;
  let fixture: ComponentFixture<TableInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
