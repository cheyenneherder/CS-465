import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public onLogout(): void {
    return this.authenticationService.logout();
  }
}