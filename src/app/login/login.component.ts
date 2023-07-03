import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import * as bcrypt from 'bcryptjs';
import { User } from '../user';
import ValidatorForm from '../validationForm';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  err = false;
  @ViewChild("checkexit") modalContent!: ElementRef;
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userd: UserService,
    private http: HttpClient,
    private cookieService: CookieService,
    private matdialog: MatDialog
  ) { }
  onSubmit(): void {
    if (this.loginForm.valid) {
      // kiểm tra tài khoản user
      this.userd.getList().subscribe((res) => {
        const user = res.find((us: User) => {
          return (us.username ===
            this.loginForm.value.username &&
            bcrypt.compareSync(this.loginForm.value.password ?? "", us.password)) && us.jurisdiction === 0;
        });
        // kiểm tra tài khoản admin
        const admin = res.find((us: User) => {
          return (us.username ===
            this.loginForm.value.username &&
            bcrypt.compareSync(this.loginForm.value.password ?? "", us.password))
            && us.jurisdiction === 1;
        })

        if (user) {
          this.cookieService.set(
            "user",
            JSON.stringify({ id: user.id, username: user.username })
          );
          this.userd.setNameLogin(user.username);
          this.matdialog.closeAll();
        }
        else if (admin) {
          this.cookieService.set('admin',  JSON.stringify({ id: admin.id, username: admin.username }))
          this.route.navigate(['/seller-home']);
        }
        else {
          this.err = true;
        }
      });
    }
    else {
      ValidatorForm.validateAllFormFileds(this.loginForm)
    }
  }
  register() {
    this.matdialog.closeAll();
    this.matdialog.open(RegisterComponent);
  }
  @HostListener("document:click", ["$event"])
  handleClickEvent(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest(".container")) {
      this.matdialog.closeAll();
    }
  }
}
