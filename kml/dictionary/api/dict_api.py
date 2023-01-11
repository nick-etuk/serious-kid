from icecream import ic
from kml.dictionary.api.unpack_response_dict import unpack_response_dict
from requests import get
from kml.utils.utils import pause


class DictAPI:
    def __init__(self):
        pass

    def fetch_meanings(self, word: str, pos_tag: str):
        response = None
        url = rf'https://api.dictionaryapi.dev/api/v2/entries/en/{word.lower()}'
        request = get(url)
        if request.status_code == 200:
            response = request.json()
        else:
            print(
                f'API failed for {word}. Return code is {request.status_code}')

        pause(1)
        # ic(response)
        return unpack_response_dict(response, word, pos_tag)


if __name__ == "__main__":
    api = DictAPI()
    print(api.fetch_meanings('circumstance', 'NN'))
