import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlight } from '../models/flight.interface';
import { IWorker } from '../models/worker.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private readonly workersSignal: WritableSignal<IWorker[]> = signal([]);
  private readonly flightsSignal: WritableSignal<IFlight[]> = signal([]);
  private readonly flightsLoadedSubject = new Subject<number>();
  
  flightsLoaded$ = this.flightsLoadedSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  get workers(): WritableSignal<IWorker[]> {
    return this.workersSignal;
  }

  get flights(): WritableSignal<IFlight[]> {
    return this.flightsSignal;
  }

  fetchWorkers() {
    this.http.get<IWorker[]>('/api/workers').subscribe((data) => {
      this.workersSignal.set(data);
    });
  }

  fetchFlights(workerId: number) {
    this.http
      .get<IFlight[]>(`/api/flights/${workerId}`)
      .subscribe((data) => {
        this.flightsSignal.set(data);
        this.flightsLoadedSubject.next(workerId);
      });
  }
}
