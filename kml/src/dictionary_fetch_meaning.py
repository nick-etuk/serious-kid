from icecream import ic
from requests import get


def dictionary_api(word: str):
    request = get(rf'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception(f'API failed. Return code is {request.status_code}')


def fetch_meaning(word: str):
    result = ''
    response = dictionary_api(word)
    # ic(response)
    meanings = response[0]['meanings']
    for meaning in meanings:
        definition = meaning['definitions'][0]['definition']
        result += definition + ' '

    return result


if __name__ == "__main__":
    print(fetch_meaning('nutrient'))
