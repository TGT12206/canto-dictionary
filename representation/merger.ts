import { Canto_Reading_of_CCEDICT, CCEDICT_Entry, Canto_Exclusive_Entry, type Dictionary_Entry, Normalized_Entry } from './representation.js';

export async function Read_File(path: string) {
    const response = await fetch(path);
    
    if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.statusText}`);
    }

    const text = await response.text();
    
    return text.split(/\r?\n/);
}
//#region Combines all the dictionaries. No longer needed and can't run without being pure backend anyway
// function Download_File(content: string, name: string) {
//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = name;
    
//     document.body.appendChild(link);
//     link.click();
    
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
// }
// export async function Merge_All_Dicts(ccedict_path: string, canto_readings_path: string, cc_canto_path: string, output_path: string) {
//     let m_entries = new Map<string, Dictionary_Entry>();
//     let c_entries = new Map<string, Dictionary_Entry>();

//     const CCEDICT = await Read_File(ccedict_path);

//     for await (const line of CCEDICT) {
//         if (line.at(0) === '#') continue;

//         const newEntry = CCEDICT_Entry.From_Line(line);
//         const key = `${newEntry.traditional}${newEntry.pinyin}`;
//         m_entries.set(key, newEntry);
//     }

//     const CCEDICT_CANTO = await Read_File(canto_readings_path);
//     const has_canto = new Set<string>();

//     for await (const line of CCEDICT_CANTO) {
//         if (line.at(0) === '#') continue;

//         const newEntry = Canto_Reading_of_CCEDICT.From_Line(line);
//         const key = `${newEntry.traditional}${newEntry.pinyin}`;
//         has_canto.add(key);
//         const entry = m_entries.get(key);
//         if (entry !== undefined) {
//             newEntry.definitions = entry.definitions;
//         }
//         c_entries.set(`${key}${newEntry.jyutping}`, newEntry);
//     }

//     const CANTO = await Read_File(cc_canto_path);

//     for await (const line of CANTO) {
//         if (line.at(0) === '#') continue;

//         const newEntry = Canto_Exclusive_Entry.From_Line(line);
//         has_canto.add(`${newEntry.traditional}${newEntry.pinyin}`);
//         const key = `${newEntry.traditional}${newEntry.pinyin}${newEntry.jyutping}`;
//         const entry = c_entries.get(key);
//         if (entry !== undefined) {
//             entry.jyutping = newEntry.jyutping;
//             entry.definitions += `; ${newEntry.definitions}`;
//         } else {
//             c_entries.set(key, newEntry);
//         }
//     }

//     let output = '';
//     for (const e of m_entries.entries()) {
//         if (has_canto.has(e[0])) continue;
//         output += `${e[1].toString()}\n`;
//     }
//     for (const e of c_entries.values()) {
//         output += `${e.toString()}\n`;
//     }

//     Download_File(output, output_path);
// }
//#endregion
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