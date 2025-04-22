import { FlightDurationPipe } from './flight-duration.pipe';

describe('FlightDurationPipe', () => {
  let pipe: FlightDurationPipe;

  beforeEach(() => {
    pipe = new FlightDurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform minutes to hours and minutes format', () => {
    expect(pipe.transform(60)).toBe('1h 0m');
    expect(pipe.transform(90)).toBe('1h 30m');
    expect(pipe.transform(145)).toBe('2h 25m');
  });

  it('should handle zero minutes', () => {
    expect(pipe.transform(0)).toBe('0h 0m');
  });

  it('should handle minutes less than an hour', () => {
    expect(pipe.transform(45)).toBe('0h 45m');
  });

  it('should handle minutes exactly at hour boundaries', () => {
    expect(pipe.transform(120)).toBe('2h 0m');
    expect(pipe.transform(180)).toBe('3h 0m');
  });
});
