from icecream import ic
from kml.dictionary.api.dict_api import DictAPI
from kml.dictionary.api.sample_response_dict import dict_response
from kml.utils.init import init


def test_dict_api():
    init()
    expected = [
        'The act of swimming or bathing, especially in the sea, a lake, or a river; a swimming bath.'
    ]

    api = DictAPI()
    actual = api.fetch_meanings('swimming', 'NN')
    ic(expected)
    ic(actual)
    assert actual == expected


if __name__ == "__main__":
    pass
