from icecream import ic
from kml.dictionary.api.map_tag import map_tag
from kml.dictionary.api.dict_api import DictAPI


def unpack_response_oxford(response, word: str, pos_tag: str):
    print(f'word: {word}')

    dict_api = DictAPI()

    definition_list = []
    synonym_list = []

    oxford_pos = map_tag(pos_tag)

    for result in response['results']:
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

                        print(f'synonyms:')
                        synonyms = sense['synonyms']
                        for synonym in synonyms:
                            syn = synonym['text']
                            if syn not in synonym_list and ' ' not in syn:
                                syn_meanings = dict_api.fetch_meanings(
                                    word=syn, pos_tag=pos_tag)
                                ic(syn_meanings)
                                if syn_meanings:
                                    syn_meaning = syn_meanings[0]
                                    if syn in syn_meaning or word in syn_meaning:
                                        print(
                                            f"Rejecting {syn}. Poor quality definition: '{syn_meaning}")
                                        continue
                                    synonym_list.append({
                                        'synonym': syn,
                                        # Just the first meaning is enough for answer options
                                        'meaning': syn_meaning
                                    }
                                    )
                                # ic(synonym['text'])

    # ic(definition_list)
    # ic(synonym_list)
    result = {
        'meanings': definition_list,
        'synonyms': synonym_list
    }
    print(f"OxfordAPI {word}: {result}")
    return result
