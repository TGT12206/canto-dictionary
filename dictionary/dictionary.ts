import type { Normalized_Entry } from "../representation/representation.js";
import { Trie } from "./trie.js";

export type Search_Mode = 'jyutping' | 'pinyin' | 'traditional' | 'simplified';

export class Dictionary {
    constructor(
        public entries: Normalized_Entry[]
    ) {}
    tries: Record<Search_Mode, Trie> = {
        'traditional': new Trie(),
        'simplified': new Trie(),
        'jyutping': new Trie(),
        'pinyin': new Trie()
    };
    build_tries() {
        this.entries.forEach((entry, index) => {
            this.tries.traditional.add_entry(entry.traditional, index);
            this.tries.simplified.add_entry(entry.simplified, index);
            this.tries.jyutping.add_entry(entry.jyutping.split(' '), index);
            this.tries.pinyin.add_entry(entry.pinyin.split(' '), index);
        });
    }
}