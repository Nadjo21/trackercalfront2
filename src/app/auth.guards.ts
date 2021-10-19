import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // On récupère les roles de l'utilisateur connecté
    const roles = this.apiService.getRoles();

    // S'il y a des roles ça veut dire qu'on est connecté
    if (roles && roles.length > 0) {
      // On regarde si le ou les roles demandés sont dans le profil utilisateur si oui, la route est activée
      for (let role of route.data.roles) {
        if (roles.includes(role)) {
          return true;
        }
      }
      // Sinon on redirige vers la page d'accueil
      this.router.navigate(['/']);
      return false;
    }

    // Et s'il n'y a pas de roles, alors ça veut dire qu'on est pas connecté, on renvoie vers le login
    this.router.navigate(['/login']);
    return false;
  }
}
