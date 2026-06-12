export abstract class Dictionary_Entry {
    traditional: string = '';
    simplified: string = '';
    jyutping: string = '';
    pinyin: string = '';
    definitions: string = '';
    static Normalize_Pinyin(pinyin: string): string {
        let normalized_pinyin = '';
        for (const l of pinyin) {
            if (l === ' ') continue;
            normalized_pinyin += l;
            if (/[1-4]/.test(l)) normalized_pinyin += ' ';
        }
        return normalized_pinyin.trim();
    }
    toString() {
        return `${this.traditional} ${this.simplified} [${this.pinyin}] {${this.jyutping}} /${this.definitions}/\n`;
    }
}
export class Normalized_Entry extends Dictionary_Entry {
    static From_Line(line: string): CCEDICT_Entry {
        const output = new Canto_Reading_of_CCEDICT();

        let i = 0;
        while (line[i] !== '\[') {
            i++;
        }

        const spelling = line.substring(0, i).trim();
        output.traditional = spelling.substring(0, Math.floor(spelling.length / 2));
        output.simplified = spelling.substring(Math.ceil(spelling.length / 2));

        let j = i;
        while(line[j] !== '\]') {
            j++;
        }

        output.pinyin = this.Normalize_Pinyin(line.substring(i + 1, j));

        i = j + 1;
        while (line[i] !== '\{') {
            i++;
        }
        j = i + 1;
        while (line[j] !== '\}') {
            j++;
        }

        output.jyutping = line.substring(i + 1, j);

        output.definitions = line.substring(j + 3).trim();
        output.definitions = output.definitions.slice(0, output.definitions.length - 1);

        return output;
    }
}
export class Canto_Exclusive_Entry extends Dictionary_Entry {
    static From_Line(line: string): Canto_Reading_of_CCEDICT {
        const output = new Canto_Reading_of_CCEDICT();

        let i = 0;
        while (line[i] !== '\[') {
            i++;
        }

        const spelling = line.substring(0, i).trim();
        output.traditional = spelling.substring(0, Math.floor(spelling.length / 2));
        output.simplified = spelling.substring(Math.ceil(spelling.length / 2));

        let j = i;
        while(line[j] !== '\]') {
            j++;
        }

        output.pinyin = this.Normalize_Pinyin(line.substring(i + 1, j));

        i = j + 1;
        while (line[i] !== '\{') {
            i++;
        }
        j = i + 1;
        while (line[j] !== '\}') {
            j++;
        }

        output.jyutping = line.substring(i + 1, j);

        output.definitions = line.substring(j + 3).trim();
        j = output.definitions.length - 1;
        while (output.definitions[j] !== '\/') {
            j--;
        }
        output.definitions = output.definitions.substring(0, j);

        return output;
    }
}
export class Canto_Reading_of_CCEDICT extends Dictionary_Entry {
    static From_Line(line: string): Canto_Reading_of_CCEDICT {
        const output = new Canto_Reading_of_CCEDICT();

        let i = 0;
        while (line[i] !== '\[') {
            i++;
        }

        const spelling = line.substring(0, i).trim();
        output.traditional = spelling.substring(0, Math.floor(spelling.length / 2));
        output.simplified = spelling.substring(Math.ceil(spelling.length / 2));

        let j = i;
        while(line[j] !== '\]') {
            j++;
        }

        output.pinyin = this.Normalize_Pinyin(line.substring(i + 1, j));

        i = j + 1;
        while (line[i] !== '\{') {
            i++;
        }
        j = i + 1;
        while (line[j] !== '\}') {
            j++;
        }

        output.jyutping = line.substring(i + 1, j);

        return output;
    }
}
export class CCEDICT_Entry extends Dictionary_Entry {
    static From_Line(line: string): CCEDICT_Entry {
        const output = new CCEDICT_Entry();

        let i = 0;
        while (line[i] !== '\[') {
            i++;
        }

        const spelling = line.substring(0, i).trim();
        output.traditional = spelling.substring(0, Math.floor(spelling.length / 2));
        output.simplified = spelling.substring(Math.ceil(spelling.length / 2));

        let j = i;
        while(line[j] !== '\]') {
            j++;
        }

        output.pinyin = this.Normalize_Pinyin(line.substring(i + 1, j));

        output.definitions = line.substring(j + 3).trim();
        output.definitions = output.definitions.substring(0, output.definitions.length - 1);

        return output;
    }
}