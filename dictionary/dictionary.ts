import type { Normalized_Entry } from "../representation/representation.js";
import { Trie } from "./trie.js";

export class Dictionary {
    entries: Normalized_Entry[] = [];
    tries = {
        traditional: new Trie(),
        simplified: new Trie(),
        jyutping: new Trie(),
        pinyin: new Trie()
    }
    build_tries() {
        this.entries.forEach((entry, index) => {
            this.tries.traditional.add_entry(entry.traditional, index);
            this.tries.simplified.add_entry(entry.traditional, index);
            this.tries.jyutping.add_entry(entry.traditional, index);
            this.tries.pinyin.add_entry(entry.traditional, index);
        });
    }
}