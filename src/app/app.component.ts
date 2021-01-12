import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data = ['One', 'Two', 'Three'];
  constructor(private readonly formBuilder: FormBuilder) {
    this.form.valueChanges.subscribe(console.log);
  }
  form = this.formBuilder.group({
    autocomplete: [''],
  });
}
