
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
    if (role === 'Student') {
      const allowedRoutes = ['/trainee-course', '/trainee-dashboard', '/login','/trainee-feedback','/trainee-result','/trainee-tracker','/trainee-profile','/roadmap','/forgetpassword'];
      if (allowedRoutes.includes(currentRoute)) {
        console.log('Allowed for student: ', currentRoute);
        return true;
      }
    }

    if (role === 'Manager') {
      const allowedRoutes = ['/forgetpassword', '/manager-dashboard', '/login','/manager-studentDetails','/manager-course','/manager-trainerDetails','/Manager-marks','/manager-insights','/manager-roadmap','/manager-calendar'];
      if (allowedRoutes.includes(currentRoute)) {
        console.log('Allowed for manager: ', currentRoute);
        return true;
      }
    }

    if (role === 'Trainer') {
      const allowedRoutes = ['/forgetpassword', '/roadmap', '/login','/trainer-dashboard','/trainer-publishMarks','/trainer-course','/trainer-checklist'];
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