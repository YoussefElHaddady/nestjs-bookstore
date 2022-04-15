import { Injectable } from "@nestjs/common";
import { Book, BookDocument } from "./schemas/book.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBookDTO } from "./dto/create-book.dto";

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
  }

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getById(bookID: number): Promise<Book> {
    return this.bookModel.findById(bookID).exec();
  }

  async create(createBookDto: CreateBookDTO): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async update(bookID: number, createBookDto: CreateBookDTO): Promise<Book> {
    const updatedBook = new this.bookModel(createBookDto);
    return this.bookModel.findByIdAndUpdate(bookID, updatedBook, { new: false });
  }

  async delete(bookID: number): Promise<any> {
    return this.bookModel.findByIdAndRemove(bookID);
  }
}
