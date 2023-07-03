import { Component, EventEmitter, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ColorService } from "src/app/services/color.service";
import { UserService } from "src/app/services/user.service";
import { HomeComponent } from "src/app/home/home.component";
import { LoginComponent } from "src/app/login/login.component";
import { Product } from "src/app/product";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  cartItems = 0;
  name: string = "";
  nameLogin: string = "";

  constructor(
    private product: ColorService,
    private cookieService: CookieService,
    private user: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.getNameLogin().subscribe((name) => {
      this.nameLogin = name;
    });
    const namecookieUser = this.cookieService.get('user');
    const namecookieAdmin = this.cookieService.get('admin');

    if (namecookieAdmin) {
      this.product.getCartItems(JSON.parse(namecookieAdmin).id).subscribe((cartItems: Product[] | []) => {
        this.cartItems = cartItems.length;
        this.getNameAdmin(); // Update the name immediately
      });
    } else {
      this.product.getCartItems(JSON.parse(namecookieUser).id).subscribe((cartItems: Product[] | []) => {
        this.cartItems = cartItems.length;
        this.getName(); // Update the name immediately
      });
    }
  }
  isAdmin(): boolean {
    const namecookieAdmin = this.cookieService.get("admin");
    return !!namecookieAdmin; // Trả về true nếu tồn tại cookie "admin", ngược lại trả về false
  }
  
  getName() {
    const namecookieUser = this.cookieService.get("user");
    this.user.setNameLogin(JSON.parse(namecookieUser).username)
  }
  getNameAdmin() {
    const namecookieAdmin = this.cookieService.get("admin");
    this.user.setNameLogin(JSON.parse(namecookieAdmin).username)
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent);
  }
  logout() {
    this.cookieService.delete("admin")
    this.cookieService.delete("user");
    this.user.setNameLogin(this.name);
    this.router.navigate(["/home"]);
    this.cartItems = 0;
  }
}
