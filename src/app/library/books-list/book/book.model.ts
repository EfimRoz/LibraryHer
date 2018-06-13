export class Book {

  private _author: string;
  private _date: Date;
  private _title: string;

  constructor(author: string, date: Date, title: string) {
    this._date = new Date();

    this._author = author;
    this.date = date;
    this._title = title;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get date(): Date {
    // Creating a new instance of Date object to avoid
    // aliasing
    return ( this._date === null ) ? null : new Date(this._date);
  }

  set date(value: Date) {
    // Changing the date parameters
    if (value === null ) {
      this._date = null;
      return;
    }
    // Changing the actual values
    // instead of the whole pointer
    // in order to have more responsive experience(Avoiding issues
    // of Angular missing the change of pointer)
    const date = value.getDate();
    const month = value.getMonth();
    const fullYear = value.getFullYear();

    if (this.date === null) {
      this._date = new Date();
    }

    this._date.setDate(date);
    this._date.setMonth(month);
    this._date.setFullYear(fullYear);
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  public clone(): Book {
    return new Book(this.author, this.date, this.title);
  }

  public copy(book: Book): void {
    this.author = book.author;
    this.date = book.date;
    this.title = book.title;
  }

  public nullifyBook(): void {
    this.title = null;
    this.author = null;
    this.date = null;
  }

}
