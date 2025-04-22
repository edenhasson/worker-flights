import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { FlightsTableComponent } from './components/flights-table/flights-table.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { IFlight } from './models/flight.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WorkersListComponent,
    FlightsTableComponent,
    FlightInfoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedWorkerId = signal<number | null>(null);
  selectedFlight = signal<IFlight | null>(null);

  onWorkerSelected(workerId: number) {
    this.selectedWorkerId.set(workerId);
    this.selectedFlight.set(null);
  }

  onFlightSelected(flight: IFlight) {
    this.selectedFlight.set(flight);
  }
}
