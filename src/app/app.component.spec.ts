import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent],
      }).compileComponents();
    }
  );

  it('should create the app', (): void => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(
      AppComponent
    );
    const app: AppComponent = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-clips'`, (): void => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(
      AppComponent
    );
    const app: AppComponent = fixture.componentInstance;
    expect(app.title).toEqual('angular-clips');
  });
});
