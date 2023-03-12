import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit{
  customerInfoForm!: FormGroup;
  isSubmitted = false;

  @Output() customerInfo = new EventEmitter();

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.customerInfoForm = this.formBuilder.group ({
      name: [
        '', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
        ]
      ],
      address: [
        '', [
        Validators.required
        ]
      ],
      cardNumber: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('[0-9]*')
        ]
      ]
    });
  }

  onSubmit(): void {
    if(this.customerInfoForm.valid) {
      this.customerInfo.emit(this.customerInfoForm.value);
      this.customerInfoForm.reset();
    }
  }

  get name() {
    return this.customerInfoForm.get('name');
  }

  get address() {
    return this.customerInfoForm.get('address')
  }

  get cardNumber() {
    return this.customerInfoForm.get('cardNumber')
  }
}
