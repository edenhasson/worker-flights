import { TestBed } from '@angular/core/testing';
import { FlightService } from './flight.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IFlight } from '../models/flight.interface';
import { IWorker } from '../models/worker.interface';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;

  const mockWorkers: IWorker[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService]
    });
    
    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch workers', () => {
    service.fetchWorkers();
    
    const req = httpMock.expectOne('/api/workers');
    expect(req.request.method).toBe('GET');
    req.flush(mockWorkers);
    
    expect(service.workers()).toEqual(mockWorkers);
  });

  it('should fetch flights for a worker', () => {
    let emittedWorkerId: number | undefined;
    
    service.flightsLoaded$.subscribe(id => {
      emittedWorkerId = id;
    });
    
    service.fetchFlights(1);
    
    const req = httpMock.expectOne('/api/flights/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockFlights);
    
    expect(service.flights()).toEqual(mockFlights);
    expect(emittedWorkerId).toBe(1);
  });
});
