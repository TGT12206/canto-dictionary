import { Canto_Reading_of_CCEDICT, CCEDICT_Entry, Canto_Exclusive_Entry, type Dictionary_Entry, Normalized_Entry } from './representation.js';

export async function Read_File(path: string) {
    const response = await fetch(path);
    
    if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.statusText}`);
    }

    const text = await response.text();
    
    return text.split(/\r?\n/);
}
export async function Load_Merged_Dictionary(path: string): Promise<Normalized_Entry[]> {
    const lines = await Read_File(path);
    
    const output: Normalized_Entry[] = [];

    for (const line of lines) {
        if (line.trim()) { // Skip empty lines
            output.push(Normalized_Entry.From_Line(line));
        }
    }

    return output;
}