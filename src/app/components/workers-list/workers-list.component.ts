import { ChangeDetectionStrategy, Component, OnInit, output, OutputEmitterRef, computed } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { IWorker } from '../../models/worker.interface';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css'],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersListComponent implements OnInit {
  selectWorker: OutputEmitterRef<number> = output<number>();
  workers = computed<IWorker[]>(() => this.flightService.workers());

  constructor(private readonly flightService: FlightService) {}

  ngOnInit() {
    this.flightService.fetchWorkers();
  }

  onWorkerClick(workerId: number) {
    this.selectWorker.emit(workerId);
  }
}