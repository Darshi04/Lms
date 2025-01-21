
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get the user role from localStorage
    const role = localStorage.getItem('role');
    console.log("Role from localStorage: ", role);

    // Get the current URL we are trying to navigate to from RouterStateSnapshot
    const currentRoute = state.url;
    console.log("Attempting to navigate to: ", currentRoute);

    // Check if the current route is allowed based on the user's role
    if (role === 'student') {
      const allowedRoutes = ['/dashboard', '/check', '/login'];
      if (allowedRoutes.includes(currentRoute)) {
        console.log('Allowed for student: ', currentRoute);
        return true;
      }
    }

    if (role === 'manager') {
      const allowedRoutes = ['/manager', '/course', '/login'];
      if (allowedRoutes.includes(currentRoute)) {
        console.log('Allowed for manager: ', currentRoute);
        return true;
      }
    }

    if (role === 'trainer') {
      const allowedRoutes = ['/home', '/marks', '/login'];
      if (allowedRoutes.includes(currentRoute)) {
        console.log('Allowed for trainer: ', currentRoute);
        return true;
      }
    }

    // If the current route is not allowed, redirect to login
    console.log('Navigation blocked. Redirecting to login.');
    this.router.navigate(['/login']);
    return false;
  }
}