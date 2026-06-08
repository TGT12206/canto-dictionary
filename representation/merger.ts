import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { Canto_Reading_of_CCEDICT, CCEDICT_Entry, Canto_Exclusive_Entry, type Dictionary_Entry } from './representation.js';
import { createWriteStream } from 'node:fs';

export async function Merge_All_Dicts(ccedict_path: string, canto_readings_path: string, cc_canto_path: string, output_path: string) {
    let m_entries = new Map<string, Dictionary_Entry>();
    let c_entries = new Map<string, Dictionary_Entry>();

    const CCEDICT = createReadStream(ccedict_path);

    let rl = createInterface({
        input: CCEDICT,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.at(0) === '#') continue;

        const newEntry = CCEDICT_Entry.From_Line(line);
        const key = `${newEntry.traditional}${newEntry.pinyin}`;
        m_entries.set(key, newEntry);
    }

    CCEDICT.close();
    rl.close();

    const CCEDICT_CANTO = createReadStream(canto_readings_path);

    rl = createInterface({
        input: CCEDICT_CANTO,
        crlfDelay: Infinity
    });

    const has_canto = new Set<string>();

    for await (const line of rl) {
        if (line.at(0) === '#') continue;

        const newEntry = Canto_Reading_of_CCEDICT.From_Line(line);
        const key = `${newEntry.traditional}${newEntry.pinyin}`;
        has_canto.add(key);
        const entry = m_entries.get(key);
        if (entry !== undefined) {
            newEntry.definitions = entry.definitions;
        }
        c_entries.set(`${key}${newEntry.jyutping}`, newEntry);
    }

    CCEDICT_CANTO.close();
    rl.close();

    const CANTO = createReadStream(cc_canto_path);

    rl = createInterface({
        input: CANTO,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.at(0) === '#') continue;

        const newEntry = Canto_Exclusive_Entry.From_Line(line);
        has_canto.add(`${newEntry.traditional}${newEntry.pinyin}`);
        const key = `${newEntry.traditional}${newEntry.pinyin}${newEntry.jyutping}`;
        const entry = c_entries.get(key);
        if (entry !== undefined) {
            entry.jyutping = newEntry.jyutping;
            entry.definitions += `; ${newEntry.definitions}`;
        } else {
            c_entries.set(key, newEntry);
        }
    }

    CANTO.close();
    rl.close();

    const writeStream = createWriteStream(output_path, { encoding: 'utf8' });

    for (const e of m_entries.entries()) {
        if (has_canto.has(e[0])) continue;
        if (!writeStream.write(e[1].toString())) {
            await new Promise(resolve => writeStream.once('drain', resolve));
        }
    }
    for (const e of c_entries.values()) {
        if (!writeStream.write(e.toString())) {
            await new Promise(resolve => writeStream.once('drain', resolve));
        }
    }
}