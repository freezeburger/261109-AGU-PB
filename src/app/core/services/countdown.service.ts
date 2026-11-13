
import { Service, signal, Signal } from '@angular/core';

@Service()
export class CountdownService {

    createCountdown(durationMs: number):Signal<number> {
        
        let remaining = durationMs;
        const countdownSignal = signal<number>(remaining / 1000 );
        const interval = setInterval(() => {
            remaining -= 1000;
            countdownSignal.set(remaining / 1000);
            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 1000);
        return countdownSignal;
    }
}