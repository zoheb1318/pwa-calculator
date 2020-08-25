import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  entries = [];
  totalValue = 0;
  tempValue = '';
  calculatedValue = '';
  allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', '%'];

  constructor() { }

  ngOnInit(): void { }

  buttonClicked(val) {
    // Got a number, add to temp
    if (!isNaN(val) || val === '.') {
      this.tempValue += val;
      this.calculatedValue = this.tempValue.substring(0, 10);

      // Got some symbol other than equals, add temp to our entries
      // then add our current symbol and clear temp
    } else if (val === 'AC') {
      this.entries = [];
      this.tempValue = '';
      this.totalValue = 0;
      this.calculatedValue = '';
    } else if (val === 'CE') {
      // Clear last value
      this.tempValue = '';
      this.calculatedValue = '';
    } else if (val === 'x') {
      // Multiplication
      this.entries.push(this.tempValue);
      this.entries.push('*');
      this.tempValue = '';
    } else if (val === '÷') {
      // Addition
      this.entries.push(this.tempValue);
      this.entries.push('/');
      this.tempValue = '';
    } else if (val === '=') {
      // Calculate
      this.entries.push(this.tempValue);

      let nt = Number(this.entries[0]);
      for (let i = 1; i < this.entries.length; i++) {
        const nextNum = Number(this.entries[i + 1]);
        const symbol = this.entries[i];

        if (symbol === '+') {
          nt += nextNum;
        } else if (symbol === '-') {
          nt -= nextNum;
        } else if (symbol === '*') {
          nt *= nextNum;
        } else if (symbol === '/') {
          nt /= nextNum;
        }

        i++;
      }

      // Swap the '-' symbol so text input handles it correctly
      if (nt < 0) {
        this.calculatedValue = Math.abs(nt).toString() + '-';
      } else {
        this.calculatedValue = nt.toString();
      }

      this.entries = [];
      this.tempValue = '';
    } else {
      // Push number
      this.entries.push(this.tempValue);
      this.entries.push(val);
      this.tempValue = '';
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log('event =>', event);
    if (this.allowedKeys.indexOf(event.key.toString()) > -1) {
      this.buttonClicked(event.key.toString());
    }
    if (event.key === 'Enter') {
      this.buttonClicked('=');
    }
  }
}
