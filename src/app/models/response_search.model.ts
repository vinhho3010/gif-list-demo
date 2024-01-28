import { Pagination } from "./pagination.model";

export interface ResponseSearch <T>{
    data: T[];
    pagination: Pagination;
}
