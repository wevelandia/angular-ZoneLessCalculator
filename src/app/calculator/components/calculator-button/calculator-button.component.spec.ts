import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<CalculatorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // Esta linea la coloco por defecto pero siempre debe de ir para que se puedan detectar cambios por ejemplo la clase de w-1/4.
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verificamos que es lo que tenemos aca en Calculator-bottom imprimiendo por consola
    console.log(compiled);

    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 doubleSize is false', () => {

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    // Validamos que este la clase w-1/4
    expect(hostCssClasses).toContain('w-1/4');

    // Validamos que doubleSize este en false.
    expect(component.isDoubleSize()).toBeFalse();
  });

  // Verificamos ahora la clase w-2/4 pero para ello se debe de inicializar ello, mandarle el parametro de isDoubleSize en true.
  it('should apply w-2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    // Para que detecte el cambio anterior igual lo forzamos a detectar ese cambio con la siguiente linea.
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    // Validamos que este la clase w-2/4
    expect(hostCssClasses).toContain('w-2/4');

    // Validamos que doubleSize este en false.
    expect(component.isDoubleSize()).toBeTrue();
  });

  // Ahora validamos cuando se oprime un boton de la calculadora se llame al onClick
  it('should emit onClick when handleClick is called', () => {

    // Espias
    spyOn( component.onClick, 'emit' );

    // Se dispara el procedimiento handleClick
    component.handleClick();

    // Que es lo que se estaria esperando que handleClick haya sido llamado
    expect(component.onClick.emit).toHaveBeenCalled();

    // Aca se espera que el metodo handleClick se este llamando con un string vacio
    // expect(component.onClick.emit).toHaveBeenCalledWith('');
  });

  // Validamos ahora para cuando se llama a keyboardPressedStyle
  // done lo que permite es que como debemos esperar una milesima de segundo para simular que si se oprimio un taecla se pase a false: this.isPressed.set(false);
  it('should set isPresssed to true and then false when keyboardPressedStyle is called with a matching key ', (done) => {

    // Primero preparamos la prueba
    component.contentValue()!.nativeElement.innerText = '1';

    console.log(compiled);

    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    // Ahora probamos que pasados unos segundos pase de nuevo a false
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);

  });
});
