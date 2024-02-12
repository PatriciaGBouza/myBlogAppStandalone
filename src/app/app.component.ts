import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogEntriesComponent } from './components/blog-entries/blog-entries.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogEntriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myBlogAppStandalone';
}
