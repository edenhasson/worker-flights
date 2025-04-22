import { Component, input, OnChanges, SimpleChanges, output, ChangeDetectionStrategy, OutputEmitterRef, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { IFlight } from '../../models/flight.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightsTableComponent implements OnChanges, OnInit, OnDestroy {
  workerId = input.required<number>();
  flightSelected: OutputEmitterRef<IFlight>  = output<IFlight>();
  selectedFlight = signal<IFlight | null>(null);
  
  flights = computed<IFlight[]>(() => this.flightService.flights());

  constructor(private readonly flightService: FlightService) {}

  private intervalId: any;
  private readonly subscription = new Subscription();
  private currentWorkerId: number | null = null;

  ngOnInit() {
    this.subscription.add(
      this.flightService.flightsLoaded$.subscribe(workerId => {
        const flights = this.flights();
        if (flights.length > 0) {
          if (workerId !== this.currentWorkerId) {
            this.selectFlight(flights[0]);
            this.currentWorkerId = workerId;
          } else {
            const currentSelected = this.selectedFlight();
            if (!currentSelected || !flights.some(flight => this.isSameFlight(flight, currentSelected))) {
              this.selectFlight(flights[0]);
            }
          }
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workerId'] && this.workerId()) {
      this.fetchFlights();
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => this.fetchFlights(), 60000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscription.unsubscribe();
  }

  fetchFlights() {
    this.flightService.fetchFlights(this.workerId());
  }

  selectFlight(flight: IFlight) {
    this.selectedFlight.set(flight);
    this.flightSelected.emit(flight);
  }

  isSelected(flight: IFlight): boolean {
    return this.isSameFlight(flight, this.selectedFlight());
  }

  private isSameFlight(flight1: IFlight | null, flight2: IFlight | null): boolean {
    if (!flight1 || !flight2) return false;
    return flight1.num === flight2.num && 
           flight1.from === flight2.from && 
           flight1.to === flight2.to &&
           flight1.from_date === flight2.from_date;
  }
}