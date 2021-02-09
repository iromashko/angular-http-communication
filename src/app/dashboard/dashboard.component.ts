import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Title } from "@angular/platform-browser";

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from "app/core/data.service";
import { BookTrackerError } from "app/models/bookTrackerError";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService, private title: Title) {}

  ngOnInit() {
    this.dataService.getAllBooks().subscribe(
      //TODO: any
      (data: any) => (this.allBooks = data),
      (err: BookTrackerError) => console.log(err.friendlyMessage),
      () => console.log(`All done getting books.`)
    );
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe((data: void) => {
      let index: number = this.allBooks.findIndex(
        (book) => book.bookID === bookID
      );
      this.allBooks.splice(index, 1);
    }, console.log);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
