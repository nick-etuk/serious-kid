from icecream import ic
import os
from config import data_dir

from dictionary_filter_stopwords import filter_stopwords
from dictionary_lemmatize import lemmatize
from kml.dictionary_snippet_significant_words import snippet_significant_words
from tests_data_para import raw_para


def test_snippet_hard_words():
    test_data = [
        ('volcano', 'NNS'),
        ('are', 'VBP'),
        ('classify', 'VBN'),
        ('as', 'IN'),
        ('active', 'JJ'),
        ('dormant', 'JJ'),
        ('or', 'CC'),
        ('extinct', 'JJ')
    ]
    expected = [
        ('volcano', 'NNS'),
        ('classify', 'VBN'),
        ('dormant', 'JJ'),
        ('extinct', 'JJ')
    ]
    frequency_file = os.path.join(data_dir, 'word_frequency.csv')

    actual = snippet_significant_words(test_data, frequency_file)
    ic(expected)
    ic(actual)
    assert actual == expected


if __name__ == "__main__":
    test_snippet_hard_words()
