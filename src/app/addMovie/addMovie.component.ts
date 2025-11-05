import { Component, inject, signal, OnInit, HostListener, ElementRef, Inject } from '@angular/core';
import NavbarComponent from '../navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface User {
  id: number;
  name: string;
  status:string;
  email: string;
}

@Component({
  standalone: true,
  selector: 'jhi-addMovie',
  templateUrl: './addMovie.component.html',
  styleUrl: './addMovie.component.scss',
  imports: [CommonModule,NavbarComponent,MatButtonModule,MatIconModule,FormsModule,MatSelectModule,
    MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatToolbarModule,MatCardModule
  ],
})
export default class AddMovieComponent implements OnInit {
  userForm!: FormGroup;
  newMovie: Movie = {
    id: 0,
    title: '',
    image: '',
    category: 'now',
  };

  previewUrl: string | ArrayBuffer | null = null;
  dataForView:any
  constructor(private dialogRef: MatDialogRef<AddMovieComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.dataForView=data.viewData
  }
  ngOnInit(): void {
  }



  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
  
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG and PNG files are allowed.');
      input.value = '';
      this.previewUrl = '';
      this.newMovie.image = '';
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.newMovie.image = this.previewUrl;
    };
    reader.readAsDataURL(file);
  }

  addMovie(): void {
    const { title, category, image } = this.newMovie;

    if (!title || title.trim() === '') {
      alert('Please enter a movie title.');
      return;
    }
  
    if (!category) {
      alert('Please select a movie category.');
      return;
    }
  
    if (!image) {
      alert('Please upload a JPEG or PNG image.');
      return;
    }
  
    // If all validations pass
    this.newMovie.id = Date.now();
    this.dialogRef.close(this.newMovie);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // 
  // users: User[] = [];
  // editMode = false;
  // currentUserId: number | null = null;

  // constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.userForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(3)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     status:['',Validators.required]
  //   });

  //   this.loadUsers();
  // }

  // // Load users from local storage
  // loadUsers() {
  //   const data = localStorage.getItem('users');
  //   this.users = data ? JSON.parse(data) : [];
  // }

  // // Save to local storage
  // saveToLocalStorage() {
  //   localStorage.setItem('users', JSON.stringify(this.users));
  // }

  // onSubmit() {
  //   if (this.userForm.invalid) return;

  //   const userData = {
  //     id: this.currentUserId ?? new Date().getTime(),
  //     ...this.userForm.value
  //   };

  //   if (this.editMode) {
  //     const index = this.users.findIndex(u => u.id === this.currentUserId);
  //     this.users[index] = userData;
  //     this.editMode = false;
  //   } else {
  //     this.users.push(userData);
  //   }

  //   this.saveToLocalStorage();
  //   this.userForm.reset();
  //   this.currentUserId = null;
  // }

  // editUser(user: User) {
  //   this.editMode = true;
  //   this.currentUserId = user.id;
  //   this.userForm.patchValue(user);
  // }

  // deleteUser(id: number) {
  //   this.users = this.users.filter(u => u.id !== id);
  //   this.saveToLocalStorage();
  // }

  // cancelEdit() {
  //   this.editMode = false;
  //   this.currentUserId = null;
  //   this.userForm.reset();
  // }
}