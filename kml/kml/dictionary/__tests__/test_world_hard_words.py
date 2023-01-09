import pytest
import os
from icecream import ic
from config import data_dir
from dictionary.world_hard_words import world_hard_words


def test_world_hard_words():
    expected = ['amongst', 'wool', 'foundations', 'msgstr', 'arrest', 'volleyball',
                'adipex', 'horizon', 'deeply', 'toolbox']

    frequency_file = os.path.join(data_dir, 'word_frequency.csv')
    actual = world_hard_words(frequency_file)[0:10]
    ic(expected)
    ic(actual)

    assert actual == expected
