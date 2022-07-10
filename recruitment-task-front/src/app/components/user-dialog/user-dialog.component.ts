import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateUserDto} from "../../models/create-user-dto";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message/message.service";
import {UserService} from "../../services/ user/user.service";

type UserControls = { [key in keyof CreateUserDto]: AbstractControl };
type UserFormGroup = FormGroup & { value: CreateUserDto, controls: UserControls };

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  userForm = this.fb.group<CreateUserDto>(this.formFields()) as UserFormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: CreateUserDto,
    private messageService: MessageService,
    private userService: UserService
  ) {
  }


  ngOnInit(): void {
  }

  formFields() {
    let controls: any = {};
    controls['username'] = new FormControl(this.userDto.username, Validators.compose([Validators.required, Validators.maxLength(254)]))
    controls['email'] = new FormControl(this.userDto.email, Validators.compose([Validators.required,
      Validators.maxLength(254),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]))
    if (!this.userDto.id) {
      controls['password'] = new FormControl(this.userDto.password, Validators.compose([Validators.required, Validators.maxLength(254)]))
    }
    return controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void {
    if (this.userForm.valid) {
      const userDto: CreateUserDto = this.userForm.value
      this.userService.existsByEmail(userDto.email).subscribe({
        next: (value) => {
          if (value) {
            this.messageService.displayErrorMessage("User with that email already exists")
          } else {
            this.userService.existsByUsername(userDto.username).subscribe({
              next: (value) => {
                if (value) {
                  this.messageService.displayErrorMessage("User with that username already exists")
                } else {
                  this.dialogRef.close({id: this.userDto.id, ...this.userForm.value});
                }
              },
              error: () => {
                this.messageService.displayErrorMessage("Problem with checking form")
              }
            })
          }
        },
        error: () => {
          this.messageService.displayErrorMessage("Problem with checking form")
        }
      })
    } else {
      this.messageService.displayErrorMessage("Form is not valid")
    }

  }

}
