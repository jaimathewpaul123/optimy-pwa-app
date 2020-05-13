import { Component, OnInit } from '@angular/core';
import {Constants} from 'src/app/core/constants/constants';
import {Router} from '@angular/router';
import {UtilsService} from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constants = Constants;
  constructor(private router: Router,
              private utils: UtilsService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem(Constants.userToken);
    this.utils.setLogInStatus(false);
    this.router.navigateByUrl(Constants.routes.login);
  }

}
