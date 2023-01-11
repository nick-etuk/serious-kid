from icecream import ic
from kml.dictionary.api.unpack_response_oxford import unpack_response_oxford
from requests import get
from kml.utils.utils import pause
from kml.utils.config import oxford_id, oxford_key


class OxfordAPI:
    def __init__(self):
        pass

    def fetch_meanings(self, word: str, pos_tag: str):
        app_id = oxford_id
        app_key = oxford_key
        response = None

        lang = 'en'
        url = rf'https://od-api.oxforddictionaries.com:443/api/v2/word/{lang}/{word.lower()}'

        request = get(url, headers={'app_id': app_id, 'app_key': app_key})
        if request.status_code == 200:
            response = request.json()
        else:
            print(f'API failed for {word}. Return code {request.status_code}')

        pause(1)
        ic(response)
        return unpack_response_oxford(response, pos_tag)


if __name__ == "__main__":
    api = OxfordAPI()
    print(api.fetch_meanings('circumstance', 'NN'))
