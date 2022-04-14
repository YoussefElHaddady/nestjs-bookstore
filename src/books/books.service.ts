import { HttpException, Injectable } from "@nestjs/common";
import { BOOKS } from "./books.mock";

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(): Promise<any> {
    return Promise.resolve(this.books);
  }

  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.books.find(({ id: curBookId }) => curBookId === id);
      if (!book) {
        throw new HttpException("Book does not exist!", 404);
      }
      resolve(book);
    });
  }

  addBook(book): Promise<any> {
    return new Promise((resolve) => {
      this.books.push(book);
      resolve(this.books);
    });
  }

  deleteBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new HttpException("Book does not exist!", 404);
      }
      this.books.splice(index, 1);
      resolve(this.books);
    });
  }
}
