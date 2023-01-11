
from kml.dictionary.api.mock_oxford_api import MockOxfordAPI
from kml.load.load_file import load_file


def test_load_file():
    load_file(subject_id='TST1', topic_id=1,
              level_id='HS', filename='load_file_test', dictionary_api=MockOxfordAPI())
