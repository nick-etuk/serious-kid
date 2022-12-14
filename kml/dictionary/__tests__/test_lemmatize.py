# from icecream import ic
from kml.dictionary.filter_stopwords import filter_stopwords
from kml.dictionary.lemmatize import lemmatize
from kml.tests.data.para import raw_para


def test_lemmatize():
    expected = [('volcano', 'NNS'),
                ('classify', 'VBN'),
                ('active', 'JJ'),
                ('dormant', 'JJ'),
                ('extinct', 'JJ')]

    actual = lemmatize(filter_stopwords(raw_para))
    assert actual == expected


if __name__ == "__main__":
    test_lemmatize()
