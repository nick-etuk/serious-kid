import pytest
import os
from icecream import ic
from kml.utils.config import data_dir
from kml.dictionary.world_significant_words import world_significant_words


def test_world_significant_words():
    expected = ['amongst', 'wool', 'foundations', 'msgstr', 'arrest', 'volleyball',
                'adipex', 'horizon', 'deeply', 'toolbox']

    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    actual = world_significant_words(frequency_file)[0:10]
    ic(expected)
    ic(actual)

    assert actual == expected
