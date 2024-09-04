import { Injectable } from '@angular/core';
import 'core-js/stable/atob';
import { JwtPayload, jwtDecode } from 'jwt-decode';


interface CustomJwtPayload extends JwtPayload {
  Role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeToken(token: string): CustomJwtPayload | null {
    try {
      if (token == '' || token == null) return null;
      return jwtDecode<CustomJwtPayload>(token);
    } catch (Error) {
      console.error('Error decoding token:', Error);
      return null;
    }
  }

  getEmailFromToken(token: string): string | null | undefined {
    if (token == '' || token == null) return null;
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.sub : null;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string | undefined | null {
    const token = this.getToken();
    if (token == '' || token == null) return null;
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    //return decodedToken['Role'];
    if (decodedToken) {
      return decodedToken.Role;
    }
    return '';
  }
}
