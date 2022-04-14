import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDTO } from "./dto/create-book.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks() {
    return this.booksService.getBooks();
  }

  @Get(":bookID")
  async getBook(@Param("bookID") bookID) {
    return this.booksService.getBook(bookID);
  }

  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    return this.booksService.addBook(createBookDTO);
  }

  @Delete()
  async deleteBook(@Query() query) {
    return this.booksService.deleteBook(query.bookID);
  }
}
