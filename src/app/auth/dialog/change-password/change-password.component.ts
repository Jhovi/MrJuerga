import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/usuario/models/usuario';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword: string;
  password: string;
  confirmPassword: string;
  passwordIguales: boolean;
  minLength: number;
  currentPasswordHidden: boolean;
  passwordHidden: boolean;
  confirmPasswordHidden: boolean;
  id: number;
  correo: string;
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private authService: UsuarioService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {

    this.minLength = 6;
    this.passwordIguales = true;
    this.currentPasswordHidden = true;
    this.passwordHidden = true;
    this.confirmPasswordHidden = true;
    this.id = this.authService.authenticatedUserValue.id;
    this.correo = this.authService.authenticatedUserValue.correo;
  }

  onConfirmar(): void {
    this.authService.updatePassword(this.id, this.correo, this.currentPassword, this.password).subscribe(
      () => {
        this.snackBar.open("Se cambio correctamente", '', { duration: 2000 });
        this.onSalir();
      },
      err => this.snackBar.open(err, '', { duration: 2000 })
    );
  }

  onSalir(): void {
    this.dialogRef.close();
  }

  verificarPasswordIguales(): void {
    if (this.password.length > 0 || this.confirmPassword.length > 0) {
      if (this.password != this.confirmPassword) {
        this.passwordIguales = false;
      } else {
        this.passwordIguales = true;
      }
    }
  }
}
