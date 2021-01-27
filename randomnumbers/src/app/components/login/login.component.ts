import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginClick() {
    this.loginService.login(this.loginModel.username, this.loginModel.password, this.router)
  }
}
