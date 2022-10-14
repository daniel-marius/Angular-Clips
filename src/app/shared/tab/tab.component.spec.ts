import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';

describe('TabComponent', (): void => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [TabComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TabComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
