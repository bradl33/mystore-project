import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit{
  customerInfoForm!: FormGroup;
  name!: FormControl;
  address!: FormControl;
  cardNumber!: FormControl;

  isSubmitted = false;

  @Output() customerInfo = new EventEmitter();

  ngOnInit(): void {
      this.createFormControls();
      this.createForm();
  }

  createFormControls(): void {
    this.name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
    this.address = new FormControl('', Validators.required);
    this.cardNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('[0-9]*')
    ])
  }

  createForm() {
    this.customerInfoForm = new FormGroup({
      name: this.name,
      address: this.address,
      cardNumber: this.cardNumber
    });
  }

  onSubmit(): void {
    if(this.customerInfoForm.valid) {
      this.customerInfo.emit(this.customerInfoForm.value);
      this.customerInfoForm.reset();
    }
  }
}
