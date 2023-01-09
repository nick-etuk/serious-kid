# from icecream import ic
from dictionary_filter_stopwords import filter_stopwords
from tests_data_para import raw_para


def filter_stopwords():
    expected = [
        ('volcanoes', 'NNS'),
        ('classified', 'VBN'),
        ('active', 'JJ'),
        ('dormant', 'JJ'),
        ('extinct', 'JJ')
    ]

    actual = filter_stopwords(raw_para)
    assert actual == expected


if __name__ == "__main__":
    filter_stopwords()
