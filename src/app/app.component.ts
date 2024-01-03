import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  time: number = 300;
  min: number = Math.floor(this.time / 60);
  sec: number = this.time % 60;
  intervalId!: any;
  hidePause!: boolean;
  hideResume!: boolean;
  hideStart: boolean = true;
  display!: boolean;
  onStart() {
    this.hideStart = false;
    this.hidePause = true;
    this.hideResume = false;
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        if (this.sec === 0) this.sec = 60;
        if (this.sec === 60) {
          this.min--;
        }
        this.sec--;
        if (this.sec == 0 && this.min == 0) {
          this.pauseTimer();
          this.display = true;
          setTimeout(() => {
            this.display = false;
            this.onReset();
          }, 3000);
        }
      }, 1000);
    }
  }
  onReset() {
    this.hidePause = false;
    this.pauseTimer();
    this.time = 300;
    this.min = Math.round(this.time / 60);
    this.sec = 0;
    this.hideStart = true;
  }
  onPause() {
    this.hideResume = true;
    this.hidePause = false;
    this.pauseTimer();
  }
  onResume() {
    this.onStart();
  }
  pauseTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
