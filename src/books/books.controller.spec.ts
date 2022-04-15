import { BooksService } from "./books.service";
import { Test, TestingModule } from "@nestjs/testing";
import { BooksController } from "./books.controller";
import { getModelToken } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";

const mockBook = {
  id: 1,
  title: "title #1",
  description: "desc #1",
  author: "auth #1",
};

describe("BooksController", () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, {
        provide: getModelToken(Book.name), useValue: {
          new: jest.fn().mockResolvedValue(mockBook),
          constructor: jest.fn().mockResolvedValue(mockBook),
          find: jest.fn(),
          create: jest.fn(),
          exec: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
