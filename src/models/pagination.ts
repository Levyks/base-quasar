export class Pagination<T = any> {
  constructor(
    public content: T[],
    public number: number,
    public itemsPerPage: number,
    public totalElements: number
  ) {}

  get size(): number {
    return this.content.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.itemsPerPage);
  }

  get first(): boolean {
    return this.number === 0;
  }

  get last(): boolean {
    return this.number === this.totalPages - 1;
  }

  get empty(): boolean {
    return this.size === 0;
  }
}
