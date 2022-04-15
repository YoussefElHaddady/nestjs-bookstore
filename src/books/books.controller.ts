import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDTO } from "./dto/create-book.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {
  }

  @Get()
  async getBooks(@Res() response) {
    const books = await this.booksService.getAll();
    return response.status(HttpStatus.OK).json({ books });
  }

  @Get(":bookID")
  async getBook(@Res() response, @Param("bookID") bookID) {
    const book = await this.booksService.getById(bookID);
    return response.status(HttpStatus.OK).json({ book });
  }

  @Post()
  async createBook(@Res() response, @Body() createBookDTO: CreateBookDTO) {
    const newBook = await this.booksService.create(createBookDTO);
    return response.status(HttpStatus.CREATED).json({ newBook });
  }

  @Put("/:bookID")
  async updateBook(@Res() response, @Param("bookID") bookID, @Body() createBookDTO: CreateBookDTO) {
    const updatedBook = await this.booksService.update(bookID, createBookDTO);
    return response.status(HttpStatus.OK).json({ updatedBook });
  }

  @Delete("/:bookID")
  async deleteBook(@Res() response, @Param("bookID") bookID) {
    const deletedBook = await this.booksService.delete(bookID);
    return response.status(HttpStatus.OK).json({ deletedBook });
  }
}
