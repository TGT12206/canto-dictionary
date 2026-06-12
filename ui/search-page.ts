import { Dictionary, type Search_Mode } from "../dictionary/dictionary.js";
import type { Normalized_Entry } from "../representation/representation.js";

export class Search_Page {
    dictionary: Dictionary;
    get entries(): Normalized_Entry[] {
        return this.dictionary.entries;
    }
    get search_mode(): Search_Mode {
        return <Search_Mode> this.search_mode_input.value;
    }
    set search_mode(new_mode: Search_Mode) {
        this.search_mode_input.value = new_mode;
    }
    constructor(
        entries: Normalized_Entry[],
        public search_query_input: HTMLInputElement,
        public search_button: HTMLButtonElement,
        public search_mode_input: HTMLSelectElement,
        public search_results: HTMLDivElement
    ) {
        this.dictionary = new Dictionary(entries);
        this.dictionary.build_tries();

        this.add_search_mode_option('jyutping');
        this.add_search_mode_option('pinyin');
        this.add_search_mode_option('traditional');
        this.add_search_mode_option('simplified');
        this.search_mode_input.value = 'jyutping';

        this.search_button.onclick = () => this.search();
    }
    private add_search_mode_option(mode: string) {
        const new_option = this.search_mode_input.createEl('option');
        new_option.textContent = mode;
        new_option.value = mode;
    }
    private search() {
        let query: string | string[] = this.search_query_input.value;
        if (query === '') return;

        if (this.search_mode === 'jyutping' || this.search_mode === 'pinyin') {
            query = query.split(' ');
        }
        
        const results = this.dictionary.tries[this.search_mode].find(query);

        this.search_results.empty();
        for (const r of results) {
            this.display_result(r, this.search_results.createDiv('search-result'));
        }
    }
    private async display_result(index: number, div: HTMLDivElement) {
        const result = <Normalized_Entry> this.entries[index];
        div.textContent = `
            C: ${result.traditional} ${result.jyutping}\n
            M: ${result.simplified} ${result.pinyin}\n
            ${result.definitions}
        `;
    }
}