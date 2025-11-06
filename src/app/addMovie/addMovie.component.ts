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
  imports: [CommonModule,MatButtonModule,MatIconModule,FormsModule,MatSelectModule,
    MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatToolbarModule,MatCardModule
  ],
})
export default class AddMovieComponent implements OnInit {
  userForm!: FormGroup;
  movie:any = {}
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

    console.log(this.dataForView);
    
  }
  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCancel(){
    this.closeDialog()
  }
}