import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  notify(title:string, message:string, icon:string) {
    Swal.fire({
      icon: icon,
      position: 'top',
      toast: 'true',
      timer:'3000',
      title: title,
      text: message,
      showConfirmButton: false
    } as any)
  }
}
