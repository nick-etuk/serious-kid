from icecream import ic
from kml.dictionary.api.mock_oxford_api import MockOxfordAPI
from kml.dictionary.api.sample_response_dict import dict_response
from kml.utils.init import init


def test_mock_oxford_api():
    init()
    expected = {'meanings': [
        'the sport or activity of propelling oneself through water using the limbs'],
        'synonyms': [
        {
            'meaning': 'The act of swimming or bathing, especially in the '
            'sea, a lake, or a river; a swimming bath.',
            'synonym': 'bathe'
        },
        {
            'meaning': 'A lower section of a road or geological feature.',
            'synonym': 'dip'
        },
        {
            'meaning': 'Rapid circular motion.',
            'synonym': 'spin'
        },
        {
            'meaning': 'The rotation of part of the scenery within a '
            'theatrical production.',
            'synonym': 'revolve'
        },
        {
            'meaning': 'A whirling eddy.',
            'synonym': 'swirl'
        },
        {
            'meaning': 'A movement where a person spins round elegantly; a '
            'pirouette.',
            'synonym': 'twirl'
        },
        {
            'meaning': 'A circular device capable of rotating on its axis, '
            'facilitating movement or transportation or '
            'performing labour in machines.',
            'synonym': 'wheel'
        }
    ]
    }

    api = MockOxfordAPI()
    actual = api.fetch_meanings('swimming', 'NN')
    ic(expected)
    ic(actual)
    assert actual == expected


if __name__ == "__main__":
    pass
