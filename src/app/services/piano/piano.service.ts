import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PianoService {
  private audioCtx: AudioContext;
  private currentOscillator: OscillatorNode | null = null;  // Store the current oscillator

  constructor() {
    this.audioCtx = new AudioContext(); // Initialize the AudioContext
  }

  notes = [
    { name: 'Do', frequency: 261.63 },
    { name: 'Re', frequency: 293.66 },
    { name: 'Mi', frequency: 329.63 },
    { name: 'Fa', frequency: 349.23 },
    { name: 'Sol', frequency: 392.0 },
    { name: 'La', frequency: 440.0 },
    { name: 'Si', frequency: 493.88 },
    { name: 'Do', frequency: 523.25 },
  ];

  playSound(index: number, duration: number = 0.3, gain: number = 0.8): void {

    let lastPressedTime = 0;

    const now = Date.now();

    if (now - lastPressedTime < 150) {
      // Ignore if the user pressed too quickly (less than 150ms)
      return;
    }

    // Ensure AudioContext is active
    this.ensureAudioContext();

    // Stop the previous oscillator (if any) before starting a new one
    if (this.currentOscillator) {
      this.currentOscillator.stop(); // Stop previous note
    }

    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(this.notes[index].frequency, this.audioCtx.currentTime);

    gainNode.gain.setValueAtTime(Math.min(Math.max(gain, 0.01), 1), this.audioCtx.currentTime);
    oscillator.connect(gainNode);  // Connect oscillator to gain node
    gainNode.connect(this.audioCtx.destination);  // Connect gain node to output

    // Start the sound
    oscillator.start();

    // Store the current oscillator to stop it when a new note is pressed
    this.currentOscillator = oscillator;

    // Stop the oscillator after the defined duration
    oscillator.stop(this.audioCtx.currentTime + duration);

    // Reset the oscillator after it's stopped
    oscillator.onended = () => {
      this.currentOscillator = null;
    };
    
    // Update the time of the last note played
    lastPressedTime = now;
  }

  private ensureAudioContext(): void {
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume(); // Resume the AudioContext if it's suspended
    }
  }
}