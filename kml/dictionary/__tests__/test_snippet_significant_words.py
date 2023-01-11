import os
from icecream import ic
from kml.utils.config import data_dir
from kml.dictionary.snippet_significant_words import snippet_significant_words


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
