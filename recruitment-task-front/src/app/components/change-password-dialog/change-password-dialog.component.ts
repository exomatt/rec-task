import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateUserDto} from "../../models/create-user-dto";
import {MessageService} from "../../services/message/message.service";
import {UserDto} from "../../models/user-dto";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  userPasswordForm = this.fb.group({
    password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(254)])),
  })

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void {
    if (this.userPasswordForm.valid) {
      this.dialogRef.close({id: this.userDto.id, ...this.userPasswordForm.value});
    } else {
      this.messageService.displayErrorMessage("Form is not valid")
    }

  }

}
