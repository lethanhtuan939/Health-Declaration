export class PageResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    data: T[];

    constructor(page: number, size: number, totalElements: number, totalPages: number, data: T[]) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.data = data;
    }
}