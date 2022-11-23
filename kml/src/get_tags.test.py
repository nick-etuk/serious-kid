from kml import KML
from get_tags import get_tags


def test_get_tags():
    tests = [
        {
            'condition': 'q:what is the name of the biggest volcano?',
            'expected': [('q', 'what is the name of the biggest volcano?')]
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
    ]

    for test in tests:
        actual = get_tags(test['condition'])
        # print(test['condition'])
        assert test['expected'] == actual


if __name__ == "__main__":
    test_get_tags()
