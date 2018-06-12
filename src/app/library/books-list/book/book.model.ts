
export class Book {

  private _author: string;
  private _date: Date;
  private _title: string;

  constructor(author: string, date: Date, title: string) {
    this._author = author;
    this._date = new Date(date);
    this._title = title;
  }

  public clone(): Book {
    const date = new Date(this.date);
    return new Book(this.author, date, this.title);
  }

  public copy(book: Book): void {
    this.author = book.author;

    this._date.setDate(book.date.getDate());
    this._date.setMonth(book.date.getMonth());
    this._date.setFullYear(book.date.getFullYear());

    this.title = book.title;
  }
  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get date(): Date {
    return new Date(this._date);
  }

  set date(value: Date) {
    this._date = new Date(value);
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

}
