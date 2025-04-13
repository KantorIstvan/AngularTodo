import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme-service.service';
import { take, firstValueFrom } from 'rxjs';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme', async () => {
    const initialTheme = await firstValueFrom(
      service.isDarkTheme$.pipe(take(1))
    );

    service.toggleTheme();

    const newTheme = await firstValueFrom(service.isDarkTheme$.pipe(take(1)));

    expect(newTheme).toBe(!initialTheme);
    expect(localStorage.getItem('theme')).toBe(newTheme ? 'dark' : 'light');
  });

  it('should respect saved theme from localStorage', async () => {
    localStorage.clear();
    localStorage.setItem('theme', 'dark');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    service = TestBed.inject(ThemeService);
    const darkTheme = await firstValueFrom(service.isDarkTheme$.pipe(take(1)));
    expect(darkTheme).toBe(true);

    localStorage.clear();
    localStorage.setItem('theme', 'light');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    service = TestBed.inject(ThemeService);
    const lightTheme = await firstValueFrom(service.isDarkTheme$.pipe(take(1)));
    expect(lightTheme).toBe(false);
  });
});
