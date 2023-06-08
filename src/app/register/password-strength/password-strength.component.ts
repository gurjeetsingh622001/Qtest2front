import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit, OnChanges {

  @Input() public passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  private colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];
  msg: string;
  msgColor: string;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    // console.log(changes)
    const password = changes['passwordToCheck'].currentValue;
    const pwdStrength = this.checkStrength(password);

    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);
    }

    if (pwdStrength === 40) {
      this.passwordStrength.emit(true)
    } else {
      this.passwordStrength.emit(false)
    }

    switch (pwdStrength) {
      case 10: 
        this.msg = 'Poor';
        break;
      case 20:
        this.msg = 'Not Good';
        break;
      case 30:
        this.msg = 'Average';
        break;
      case 40:
        this.msg = 'Good';
        break;
    }
  }

  checkStrength(p: any) {
    // 1
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5
    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = (p.length <= 6) ? Math.min(force, 10) : force;

    // 7
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;

    return force;
  }

  private getColor(s: any) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }

  private setBarColors(count: any, col: any) {
    for (let n = 0; n < count; n++) {
      (this as any)['bar' + n] = col;
    }
  }
}
