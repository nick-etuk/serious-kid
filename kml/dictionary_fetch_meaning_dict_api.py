from icecream import ic
from requests import get
from init import init
from utils_utils import pause


def dictionary_api(word: str):
    request = get(rf'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')
    if request.status_code == 200:
        result = request.json()
        ic(result)
    else:
        # raise Exception(f'API failed for {word}. Return code is {request.status_code}')
        print(f'API failed for {word}. Return code is {request.status_code}')
        result = None

    pause(1)
    return result


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
    init()
    print(fetch_meaning('circumstance'))
