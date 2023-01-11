from typing import List
from icecream import ic
from kml.dictionary.api.map_tag import map_tag


def unpack_response_dict(response, word: str, pos_tag: str) -> List[str]:
    result = []
    if not response:
        return result

    converted_pos = map_tag(pos_tag)
    meanings = response[0]['meanings']
    for meaning in meanings:
        definition = meaning['definitions'][0]['definition']
        pos = meaning['partOfSpeech']
        if pos == converted_pos:
            # result += definition + ' '
            result.append(definition)

    print(f"DictAPI {word}: {result}")
    return result
