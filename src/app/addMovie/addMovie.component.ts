import { Component, inject, signal, OnInit, HostListener, ElementRef } from '@angular/core';
import NavbarComponent from '../navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogRef } from '@angular/material/dialog';


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
    
  newMovie: Movie = {
    id: 0,
    title: '',
    image: '',
    category: 'now',
  };

  previewUrl: string | ArrayBuffer | null = null;

  constructor(private dialogRef: MatDialogRef<AddMovieComponent>) {}

  ngOnInit(): void {}

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
}