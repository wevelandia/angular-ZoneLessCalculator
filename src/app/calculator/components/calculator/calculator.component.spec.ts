import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { inject } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { By } from '@angular/platform-browser';

// Como se deben de probar por separado todos los componentes aca ya el servicio ya ha sido testeado. Por ello creamos un Servicio fictisio.
class MockCalculatorService {
  // Aca creamos el estado inicial del servicio
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');

  // Debemos de tener una variable para nuestro numero
  public constructNumber = jasmine.createSpy('constructNumber');

}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<CalculatorComponent>;

  // Inyectamos aca el servicio fictisio para poder realziar cambios en los valores para las pruebas
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    // Aca inyectamos nuestro servicio fictisio y con ello ya tendriamos en el HTML el valor así: <span _ngcontent-a-c3135477889="">100.00</span>
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    // Comentamos esta deteccion de cambios para poder validarlo mas abajo para cuando se cambian valores con el servicio
    //fixture.detectChanges();
  });

  it('should create', () => {

    // Verificamos primero lo que tiene compiled
    //console.log(compiled);

    expect(component).toBeTruthy();
  });

  // Probamos aca que el estado inicial este dado por el servicio fictisio
  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    //console.log(compiled);

    // Se puede aca validar que se tengan esos valores en el HTML
    expect(compiled.querySelector('span')?.innerText).toBe('456 *');

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-buttom components', () => {
    // Aca validamos que existan los botones
    expect(component.calculatorButtons()).toBeTruthy();

    // Aca validamos mas exactamente los 19 botones que exitan en la calculadora
    expect(component.calculatorButtons().length).toBe(19);

  });

  it('should have 19 calculator-buttom with content projection', () => {

    //console.log(compiled);
    // Aca validamos que existan los botones pero por medio del content projection
    //const buttonsByDirective = fixture.debugElement.queryAll(
    //  By.directive(CalculatorButtonComponent) // Usa `directive` en singular
    //);

    // Esta es otra manera de ver los botones
    const buttons = compiled.querySelectorAll('calculator-button');
    // Aca se deberian de ver 19
    // console.log(buttons.length);

    //console.log(buttonsByDirective
    // );
    expect(buttons.length).toBe(19);

    // Ahora evaluamos el contenido de esos botones
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
    expect(buttons[4].textContent?.trim()).toBe('7');
    expect(buttons[5].textContent?.trim()).toBe('8');
    expect(buttons[6].textContent?.trim()).toBe('9');
    expect(buttons[7].textContent?.trim()).toBe('x');
    expect(buttons[8].textContent?.trim()).toBe('4');
    expect(buttons[9].textContent?.trim()).toBe('5');
    expect(buttons[10].textContent?.trim()).toBe('6');
    expect(buttons[11].textContent?.trim()).toBe('-');
    expect(buttons[12].textContent?.trim()).toBe('1');
    expect(buttons[13].textContent?.trim()).toBe('2');
    expect(buttons[14].textContent?.trim()).toBe('3');
    expect(buttons[15].textContent?.trim()).toBe('+');
    expect(buttons[16].textContent?.trim()).toBe('0');
    expect(buttons[17].textContent?.trim()).toBe('.');
    expect(buttons[18].textContent?.trim()).toBe('=');

  });

  // Ahora hacemos una prueba para el handlekeyboardEvent
  it('should handle keyboard events correctly', () => {

    // Esta es la preparación
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });

    // Ahora disparamos ese evento. Este es el estimulo
    document.dispatchEvent( eventEnter );

    // Que estariamos esperando
    expect( mockCalculatorService.constructNumber ).toHaveBeenCalledWith('=');

    // Probamos otro con ESC
    const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent( eventESC );
    expect( mockCalculatorService.constructNumber ).toHaveBeenCalledWith('C');

  });

  it('should dispaly result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');

    // Verificamos una prueba con el uso del id
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');

  });

});
