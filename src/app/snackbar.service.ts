import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(msg: string){
    this.snackBar.open(msg, 'OK', {
            duration: 5000
          }
      );
      }
}
