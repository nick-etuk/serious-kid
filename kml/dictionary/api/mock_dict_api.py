from icecream import ic
from kml.dictionary.api.unpack_response_dict import unpack_response_dict
from sample_response_dict import dict_response


class MockDictAPI:
    def __init__(self):
        pass

    def fetch_meanings(self, word: str, pos_tag: str):
        return unpack_response_dict(dict_response, word, pos_tag)


if __name__ == "__main__":
    api = MockDictAPI()
    print(api.fetch_meanings('circumstance', 'NN'))
