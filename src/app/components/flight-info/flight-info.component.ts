import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IFlight } from '../../models/flight.interface';
import { FlightDurationPipe } from '../../pipes/flight-duration.pipe';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css'],
  standalone: true,
  imports: [FlightDurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightInfoComponent {
  flight = input<IFlight | null>(null);
}
