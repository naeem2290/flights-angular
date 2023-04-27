import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from 'service/data-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public router: Router,
    public dataService: DataServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.registerForm.controls;
  }

  signUp() {
    if (this.registerForm.valid) {
      this.dataService.getUser().subscribe((data: any) => {
        let checkUser = data.find((element: any) => {
          return element.email === this.registerForm.value.email;
        });

        if (checkUser) {
          this.toastr.error('Already Email Taken', 'Registration Failed');
        } else {
          this.dataService
            .createUser(this.registerForm.value)
            .subscribe((res) => {
              if (res) {
                this.toastr.success(
                  'User has been created',
                  'Registration Done'
                );
                this.router.navigate(['login']);
              }
            });
        }
      });
    } else {
      this.toastr.error('Your data is Incorrect', 'Incorrect Data');
    }
  }
}
