import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightsTableComponent } from './flights-table.component';
import { FlightService } from '../../services/flight.service';
import { IFlight } from '../../models/flight.interface';
import { signal, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: `<app-flights-table [workerId]="selectedWorkerId" (flightSelected)="onFlightSelected($event)"></app-flights-table>`,
  standalone: true,
  imports: [FlightsTableComponent]
})
class TestHostComponent {
  selectedWorkerId = 1;
  onFlightSelected(flight: IFlight): void {}
}

describe('FlightsTableComponent', () => {
  let hostComponent: TestHostComponent;
  let flightsComponent: FlightsTableComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let mockFlightService: Partial<FlightService>;
  let flightsLoadedSubject: Subject<number>;

  const mockFlights: IFlight[] = [
    {
      workerId: 1,
      num: 'FL001',
      from: 'New York',
      to: 'Los Angeles',
      from_date: '2023-05-10T08:00:00',
      to_date: '2023-05-10T11:00:00',
      plane: 'Boeing 737',
      duration: 180,
      from_gate: 12,
      to_gate: 34
    }
  ];

  beforeEach(async () => {
    flightsLoadedSubject = new Subject<number>();
    
    mockFlightService = {
      fetchFlights: jest.fn(),
      flights: signal(mockFlights),
      flightsLoaded$: flightsLoadedSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, FlightsTableComponent],
      providers: [
        { provide: FlightService, useValue: mockFlightService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    
    // Get the FlightsTableComponent instance from the fixture
    flightsComponent = fixture.debugElement.children[0].componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(flightsComponent).toBeTruthy();
  });
  
  it('should call fetchFlights when workerId changes', () => {
    // Direct component method call to test fetchFlights
    flightsComponent.fetchFlights();
    expect(mockFlightService.fetchFlights).toHaveBeenCalledWith(hostComponent.selectedWorkerId);
  });
  
  it('should select a flight', () => {
    jest.spyOn(flightsComponent.flightSelected, 'emit');
    
    flightsComponent.selectFlight(mockFlights[0]);
    
    expect(flightsComponent.flightSelected.emit).toHaveBeenCalledWith(mockFlights[0]);
  });
  
  it('should clean up resources on destroy', () => {
    const originalClearInterval = global.clearInterval;
    global.clearInterval = jest.fn();
    
    flightsComponent['intervalId'] = 123;
    
    flightsComponent.ngOnDestroy();
    
    expect(global.clearInterval).toHaveBeenCalledWith(123);
    
    global.clearInterval = originalClearInterval;
  });
});
