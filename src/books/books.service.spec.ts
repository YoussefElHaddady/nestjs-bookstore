import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "./books.service";
import { getModelToken } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";

const mockBook = {
  id: 1,
  title: "title #1",
  description: "desc #1",
  author: "auth #1",
};

describe("BooksService", () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BooksService>(BooksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
