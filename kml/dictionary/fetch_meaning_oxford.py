from icecream import ic
from requests import get
from init import init
from utils_utils import pause
from kml.config import oxford_id, oxford_key


def dictionary_api(word: str):
    app_id = oxford_id
    app_key = oxford_key

    language = 'en'

    url = 'https://od-api.oxforddictionaries.com:443/api/v2/lemmas/' + \
        language + '/' + word.lower()

    r = get(url, headers={'app_id': app_id, 'app_key': app_key})

    print("status {}\n".format(r.status_code))
    print("text: \n" + r.text)
    result = r.json()
    ic(result)
    pause(1)
    return result


def fetch_meaning(api_driver, word: str):
    result = ''
    #response = dictionary_api(word)
    response = api_driver(word)
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
