import pytest
from kml import KML
from tags_get_tags import get_tags
from icecream import ic


def test_tags_get_tags():
    tests = [
        {
            'condition': 'q:what is the name of the biggest volcano?',
            'expected': [('question', 'what is the name of the biggest volcano?')]
        },
        {
            'condition': 'on the other hand, hard:vesper is defined as',
            'expected': [('hard', 'vesper')]
        },
        {
            'condition': ':colon at start',
            'expected': [],
        },
        {
            'condition':
                """
                Volcanoes are a type of topic:natural Hazard. 
                Other natural hazards are topic:earthquakes, topic:tsunamis, topic:storms, topic:landslides and topic:floods
                
                """,
            'expected': [
                ('topic', 'natural'),
                ('topic', 'earthquakes'),
                ('topic', 'tsunamis'),
                ('topic', 'storms'),
                ('topic', 'landslides'),
                ('topic', 'floods')
            ]
        },
        {
            'condition': 'mixed case tags, Hard:vesper is defined as',
            'expected': [('hard', 'vesper')]
        },
        {
            'condition': 'heading:keyword:Magma and lava',
            'expected': [('keyword', 'Magma'), ('heading', 'Magma and lava')]
        },
        {
            'condition': "single quote delimited tags, keyword:'Magma and lava'",
            'expected': [('keyword', 'Magma and lava')]
        },
        {
            'condition': 'double quote delimited tags, hard:"cobalt and chromium"',
            'expected': [('hard', 'cobalt and chromium')]
        }
    ]

    for test in tests:
        expected = test['expected']
        actual, updated_content = get_tags(test['condition'])

        ic(expected)
        ic(actual)
        # print(test['condition'])
        assert expected == actual


if __name__ == "__main__":
    test_tags_get_tags()
