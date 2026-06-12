import "./monkey-patches/html-element.js";
import { Load_Merged_Dictionary } from "./representation/merger.js";
import { Search_Page } from "./ui/search-page.js";

const search_query_input = <HTMLInputElement> document.getElementById("search-query-input");
const search_button = <HTMLButtonElement> document.getElementById("search-button");
const search_mode_input = <HTMLSelectElement> document.getElementById("search-mode");
const search_results = <HTMLDivElement> document.getElementById("search-results");

const entries = await Load_Merged_Dictionary('data/cc-edict-merged.txt');
new Search_Page(
    entries,
    search_query_input,
    search_button,
    search_mode_input,
    search_results
);