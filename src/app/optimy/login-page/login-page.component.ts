import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Constants} from 'src/app/core/constants/constants';
import {UtilsService} from 'src/app/core/services/utils.service';
import {Router} from '@angular/router';
import {LoginRequestBody, UserInfo} from 'src/app/core/constants/common.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constants = Constants;
  isFormSubmitted = false;
  loginError: string;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private utils: UtilsService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const loginRequestBody: LoginRequestBody = {
        email: this.loginForm?.value?.userName,
        password: this.loginForm?.value.password,
        tenantid: Constants.tenantid
      };
      this.utils.login(loginRequestBody).subscribe(response => {
        this.router.navigateByUrl(Constants.routes.taskHome);
      }, (error) => {
        this.loginError = error;
      });
    }
  }
}
