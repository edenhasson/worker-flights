import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { FlightsTableComponent } from './components/flights-table/flights-table.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MockComponent(WorkersListComponent),
        MockComponent(FlightsTableComponent),
        MockComponent(FlightInfoComponent)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have default state with null worker and flight', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.selectedWorkerId()).toBeNull();
    expect(app.selectedFlight()).toBeNull();
  });

  it('should set workerId and clear flight when a worker is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    app.onWorkerSelected(5);
    
    expect(app.selectedWorkerId()).toBe(5);
    expect(app.selectedFlight()).toBeNull();
  });

  it('should set the selected flight', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    const mockFlight = {
      workerId: 1,
      num: 'FL001',
      from: 'New York',
      to: 'Los Angeles',
      from_date: '2023-05-10',
      to_date: '2023-05-10',
      plane: 'Boeing 737',
      duration: 180,
      from_gate: 12,
      to_gate: 34
    };
    
    app.onFlightSelected(mockFlight);
    
    expect(app.selectedFlight()).toEqual(mockFlight);
  });
});
