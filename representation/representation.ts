export interface Dictionary_Entry {
    traditional: string;
    simplified: string;
    jyutping: string;
    pinyin: string;
    definitions: string;
}
export class Canto_Reading_of_CCEDICT implements Dictionary_Entry {
    public traditional: string = '';
    public simplified: string = '';
    public jyutping: string = '';
    public pinyin: string = '';
    public definitions: string = '';
    private static Normalize_Pinyin(pinyin: string): string {
        let normalized_pinyin = '';
        for (const l of pinyin) {
            if (l === ' ') continue;
            normalized_pinyin += l;
            if (/[1-4]/.test(l)) normalized_pinyin += ' ';
        }
        return normalized_pinyin.substring(0, normalized_pinyin.length - 1);
    }
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
        while (line[i] !== '\}') {
            j++;
        }

        output.traditional = line.substring(i, j);

        return output;
    }
}
export class CCEDICT_Entry implements Dictionary_Entry {
    public traditional: string = '';
    public simplified: string = '';
    public jyutping: string = '';
    public pinyin: string = '';
    public definitions: string = '';
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

        output.pinyin = line.substring(i + 1, j);

        i = j + 1;
        while (line[i] !== '\{') {
            i++;
        }
        j = i + 1;
        while (line[i] !== '\}') {
            j++;
        }

        output.traditional = line.substring(i, j);

        output.definitions = line.substring(j + 2).trim();
        output.definitions = output.definitions.substring(0, output.definitions.length - 1);

        return output;
    }
}