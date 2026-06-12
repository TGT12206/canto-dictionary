// import { readFile, writeFile } from 'fs/promises';
// import { Canto_Exclusive_Entry, Canto_Reading_of_CCEDICT, CCEDICT_Entry, Dictionary_Entry } from "./representation.js";

// // only works if you run this as server/backend

// export async function Merge_All_Dicts(ccedict_path: string, canto_readings_path: string, cc_canto_path: string, output_path: string) {
//     let m_entries = new Map<string, Dictionary_Entry>();
//     let c_entries = new Map<string, Dictionary_Entry>();

//     let data = (await readFile(ccedict_path, 'utf-8')).split(/\r?\n/);

//     for await (const line of data) {
//         if (line.at(0) === '#') continue;

//         const newEntry = CCEDICT_Entry.From_Line(line);
//         const key = `${newEntry.traditional}${newEntry.pinyin}`;
//         m_entries.set(key, newEntry);
//     }

//     data = (await readFile(canto_readings_path, 'utf-8')).split(/\r?\n/);
//     const has_canto = new Set<string>();

//     for await (const line of data) {
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

//     data = (await readFile(cc_canto_path, 'utf-8')).split(/\r?\n/);

//     for await (const line of data) {
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
//         output += `${e[1].toString()}`;
//     }
//     for (const e of c_entries.values()) {
//         output += `${e.toString()}`;
//     }

//     await writeFile(output_path, output, 'utf-8');
// }

// Merge_All_Dicts('data/cc-edict.txt', 'data/cc-edict-canto-readings.txt', 'data/cc-canto.txt', 'data/cc-edict-merged.txt');