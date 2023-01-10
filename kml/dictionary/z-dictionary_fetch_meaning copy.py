from icecream import ic
from requests import get
from kml.dictionary.utils import pause


def dictionary_api(word: str):
    pause(1)
    request = get(rf'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')
    if request.status_code == 200:
        return request.json()
    else:
        # raise Exception(f'API failed for {word}. Return code is {request.status_code}')
        print(f'API failed for {word}. Return code is {request.status_code}')
        return None


def fetch_meaning(word: str):
    result = ''
    response = dictionary_api(word)
    if not response:
        return result

    meanings = response[0]['meanings']
    for meaning in meanings:
        definition = meaning['definitions'][0]['definition']
        result += definition + ' '

    return result


if __name__ == "__main__":
    print(fetch_meaning('nutrient'))
