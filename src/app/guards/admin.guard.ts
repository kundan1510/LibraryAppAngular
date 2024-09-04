import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private Router: Router,
    private jwtService: JwtService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      const role = this.jwtService.getRole();
      //const userRole = decodedToken?.role; // Ensure your token has a 'role' claim
      // const role = this.jwtService.getRole();
      // return role == 'Admin';

      if (role?.toString() == 'Admin') {
        return true;
      }
    }

    // Redirect to the home page or login if not authorized
    this.router.navigate(['/admin-list']);
    return false;
  }
}
