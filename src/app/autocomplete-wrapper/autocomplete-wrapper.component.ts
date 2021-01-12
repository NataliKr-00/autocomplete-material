import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'autocomplete-wrapper',
  templateUrl: './autocomplete-wrapper.component.html',
  styleUrls: ['./autocomplete-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteWrapperComponent),
      multi: true,
    },
  ],
})
export class AutocompleteWrapperComponent
  implements ControlValueAccessor, OnInit {
  filteredData: Observable<string[]>;
  @Input() data: string[];
  myInput = new FormControl('');

  ngOnInit(): void {
    this.filteredData = this.myInput.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: any): void {
    this.myInput.setValue(outsideValue);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.data.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private onChange = (value: any) => {};

  private onTouched = () => {};

  updateValue(): void {
    this.onChange(this.myInput.value);
  }
}
