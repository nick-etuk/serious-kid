from icecream import ic
from sample_response_oxford import oxford_response


def convert_to_oxford(treebank_tag):

    if treebank_tag.startswith('J'):
        return 'adjective'
    elif treebank_tag.startswith('V'):
        return 'verb'
    elif treebank_tag.startswith('N'):
        return 'noun'
    elif treebank_tag.startswith('R'):
        return 'adverb'
    else:
        raise Exception(
            f'treebank to Oxford pos mapping failed for {treebank_tag}.')


def mock_oxford_api_fetch_meaning(word: str, pos_arg: str):
    oxford_pos = convert_to_oxford(pos_arg)

    definition_list = []
    synonym_list = []

    for result in oxford_response['results']:
        lexicalEntries = result['lexicalEntries']
        for lexicalEntry in lexicalEntries:
            pos = lexicalEntry['lexicalCategory']['text'].lower()
            ic(pos)
            if pos == oxford_pos or 1 == 1:
                for entry in lexicalEntry['entries']:
                    # ic(entry)
                    senses = entry['senses']
                    for sense in senses:
                        # ic(sense)
                        definitions = sense['definitions']
                        for definition in definitions:
                            if pos == oxford_pos:
                                definition_list.append(definition)
                                # ic(definition)

                        if not 'synonyms' in sense:
                            continue

                        synonyms = sense['synonyms']
                        for synonym in synonyms:
                            syn = synonym['text']
                            if syn not in synonym_list and ' ' not in syn:
                                syn_meanings = fetch_meanings(
                                    dict_api, syn, synonyms=False)
                                synonym_list.append({
                                    'synonym': syn,
                                    # Just the first will be enough for answer options
                                    'meaning': syn_meanings[0]
                                }
                                )
                                # ic(synonym['text'])

    ic(definition_list)
    ic(synonym_list)
    return {
        'meanings': definition_list,
        'synonyms': synonym_list
    }


if __name__ == "__main__":
    print(mock_oxford_api_fetch_meaning('circumstance', 'NN'))
