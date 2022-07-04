import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  displaySuccessMessage(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: 'notify-success'});
  }

  displayErrorMessage(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: 'notify-error'});
  }

  displayInfoMessage(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: 'notify-info'});
  }
}
