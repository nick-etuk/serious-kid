from icecream import ic
from kml.dictionary.api.unpack_response_oxford import unpack_response_oxford
from kml.dictionary.api.sample_response_oxford import oxford_response


class MockOxfordAPI:
    def __init__(self):
        pass

    def fetch_meanings(self, word: str, pos_tag: str):
        return unpack_response_oxford(oxford_response, word, pos_tag)


if __name__ == "__main__":
    api = MockOxfordAPI()
    print(api.fetch_meanings('swimming', 'NN'))
