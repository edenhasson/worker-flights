import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightInfoComponent } from './flight-info.component';
import { IFlight } from '../../models/flight.interface';
import { By } from '@angular/platform-browser';
import { FlightDurationPipe } from '../../pipes/flight-duration.pipe';
import { MockPipe } from 'ng-mocks';
import { Component } from '@angular/core';

@Component({
  template: `<app-flight-info [flight]="flightData"></app-flight-info>`,
  standalone: true,
  imports: [FlightInfoComponent]
})
class TestHostComponent {
  flightData: IFlight | null = null;
}

describe('FlightInfoComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let flightInfoElement: HTMLElement;

  const mockFlight: IFlight = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        FlightInfoComponent,
        MockPipe(FlightDurationPipe)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    flightInfoElement = fixture.nativeElement.querySelector('app-flight-info');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(flightInfoElement).toBeTruthy();
  });

  it('should not show flight info when no flight is selected', () => {
    hostComponent.flightData = null;
    fixture.detectChanges();
    
    const flightElement = fixture.debugElement.query(By.css('.flight-info'));
    expect(flightElement).toBeFalsy();
    
    expect(flightInfoElement.textContent?.trim()).toBeFalsy();
  });

  it('should display flight details when flight is provided', () => {
    hostComponent.flightData = mockFlight;
    fixture.detectChanges();
    
    const flightElement = fixture.debugElement.query(By.css('.flight-info'));
    expect(flightElement).toBeTruthy();
    
    if (flightInfoElement) {
      expect(flightInfoElement.textContent).toContain(mockFlight.plane);
    }
  });
});
