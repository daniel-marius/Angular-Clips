import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsContainerComponent } from './tabs-container.component';

describe('TabsContainerComponent', (): void => {
  let component: TabsContainerComponent;
  let fixture: ComponentFixture<TabsContainerComponent>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [TabsContainerComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TabsContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
