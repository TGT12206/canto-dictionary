# Description
I'm aiming to build a better search system for cantonese than the one at https://cantonese.org/search

Goals:
- 4 search modes (in order of priority): Jyutping, English, Hanzi (traditional and simplified should be treated the same), and Pinyin
- Entry ranking: rank the search results in a better order. For example, right now 好 is the 20th result for "good", even below 分. 好 should ideally be the first result, whether that's a result of ranking by how common the word is, or by ranking how important the query (good) is to the word (好).
- Sound approximation: as a beginner, i struggle with distinguishing tones and sounds in casual speech. maybe i can add a default list of sounds and tones that i often struggle to distinguish, and let users tweak it to their preference.
- Accounting for typos based on edit distance

# Data used
(for definitions of characters and pinyin readings)
CC-CEDICT http://cc-cedict.org/

(for definitions and characters unique to cantonese)
https://cantonese.org/download.html
CC-Canto https://cantonese.org/cccanto-170202.zip

(for cantonese readings of definitions found in CC-CEDICT)
https://cantonese.org/download.html
Cantonese readings for CC-CEDICT https://cantonese.org/cccedict-canto-readings-150923.zip

All three titles are open-source and distributed under a Creative Commons Attribution-ShareAlike 3.0 license. CC-Canto and the CC-CEDICT Cantonese readings are copyright (c) 2015-16 Pleco Software Incorporated, while CC-CEDICT itself is copyrighted by its maintainers with portions from the original CEDICT database copyright (c) 1997, 1998 Paul Andrew Denisowski.