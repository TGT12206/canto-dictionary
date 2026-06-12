export class Trie_Node {
    entry_index: number | null = null; // if this does not lead to a complete entry, the index is null
    children: Map<string, Trie_Node> = new Map();
    get_all_child_node_entries(output: number[] = []): number[] {
        if (this.entry_index !== null) output.push(this.entry_index);
        for (const c of this.children.values()) {
            c.get_all_child_node_entries(output);
        }
        return output;
    }
}
export class Trie {
    root: Trie_Node = new Trie_Node();
    add_entry(entry_name: string | string[], entry_index: number): void {
        let curr_node = this.root;
        for (const c of entry_name) {
            let next_node = curr_node.children.get(c);
            if (next_node === undefined) {
                next_node = new Trie_Node();
                curr_node.children.set(c, next_node);
            }
            curr_node = next_node;
        }
        curr_node.entry_index = entry_index;
    }
    find(query: string | string[]): number[] {
        let curr_node = this.root;
        for (const c of query) {
            console.log(c);
            console.log(curr_node.children.keys());
            let next_node = curr_node.children.get(c);
            if (next_node === undefined) return [];
            curr_node = next_node;
        }
        return curr_node.get_all_child_node_entries();
    }
}