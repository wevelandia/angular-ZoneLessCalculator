import { ComponentFixture, TestBed } from '@angular/core/testing';

import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<CalculatorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Realizamos la prueba de buscar que el componente calculator exista
  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  // Realizamos prueba de las clases basicas que estariamos esperando
  it('should contain basic css classes', () => {

    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');

    const shouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    shouldHave.forEach(className => {
      expect(divClasses).toContain(className);
    });

  });

});
