import { ISearchViewModel } from "./ISearchViewModel";

export interface ISearchResultsViewModel {
    results: Array<ISearchViewModel>;
    date: string;
    searchTerm: string;
    cleanedSearch: string;
    classIdForRedirection: number;
}