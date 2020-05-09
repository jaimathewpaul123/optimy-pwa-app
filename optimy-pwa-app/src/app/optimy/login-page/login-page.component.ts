import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Constants} from 'src/app/core/constants/constants';
import {UtilsService} from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constants = Constants;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
  }

  login() {
    this.utils.login().subscribe(response => {
      console.log('success', response);
    });
  }

}
