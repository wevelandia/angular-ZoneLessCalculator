import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/* Comando: ng g c calculator/views/calculator-view --inline-template=false --inline-style=false */

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [
    CalculatorComponent,
  ],
  templateUrl: './calculator-view.component.html',
  /* changeDetection lo definimos para poder trabajar con ZoneLess */
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class CalculatorViewComponent {

}
