import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkersListComponent } from './workers-list.component';
import { FlightService } from '../../services/flight.service';
import { signal } from '@angular/core';

describe('WorkersListComponent', () => {
  let component: WorkersListComponent;
  let fixture: ComponentFixture<WorkersListComponent>;
  let mockFlightService: Partial<FlightService>;

  beforeEach(async () => {
    mockFlightService = {
      fetchWorkers: jest.fn(),
      workers: signal([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [WorkersListComponent],
      providers: [
        { provide: FlightService, useValue: mockFlightService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch workers on init', () => {
    expect(mockFlightService.fetchWorkers).toHaveBeenCalled();
  });

  it('should emit worker ID when a worker is clicked', () => {
    jest.spyOn(component.selectWorker, 'emit');
    
    component.onWorkerClick(1);
    
    expect(component.selectWorker.emit).toHaveBeenCalledWith(1);
  });
});
