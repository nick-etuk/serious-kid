
from kml.parse.parse import ParseKML


def test_prev_word():
    tests = [
        {
            'condition': 'q:what is the name of the biggest volcano?',
            'expected': 'q'
        },
        {
            'condition': 'on the other hand, hard:vesper is defined as',
            'expected': 'hard'
        },
        {
            'condition': ':colon at start',
            'expected': ''
        }
    ]

    for test in tests:
        kml = ParseKML(test['condition'])
        kml.find_next(":")
        kml.push()
        actual = kml.prev_word()
        kml.pop()

        print(test['condition'])
        print(f"exepected:{test['expected']}   got:{actual}")
        assert (actual == test['expected'])


def test_next_word():
    tests = [
        {
            'condition': 'q:what is the name of the biggest volcano?',
            'expected': 'what'
        },
        {
            'condition': 'on the other hand, hard:vesper is defined as',
            'expected': 'vesper'
        },
        {
            'condition': ':colon at start',
            'expected': 'colon'
        },
        {
            'condition':
                """
                Volcanoes are a type of topic:natural Hazard. 
                Other natural hazards are topic:earthquakes, topic:tsunamis, topic:storms, topic:landslides and topic:floods
                """,
            'expected': [
                'topic=natural',
                'topic=earthquakes',
                'topic=tsunamis',
                'topic=storms',
                'topic=landslides',
                'topic=floods'
            ]
        }
    ]

    for test in tests:
        kml = ParseKML(test['condition'])
        kml.find_next(":")
        kml.push()
        actual = kml.next_word()
        kml.pop()

        print(test['condition'])
        print(f"exepected:{test['expected']}   got:{actual}")
        # as


def test_next_sentence():
    test_cases = [
        'q:what is the name of the biggest volcano?',
        'question: where is the north pole? on the other hand, hard:vesper is defined as',
        'topic: no word break',
        'q:no word break'
    ]

    for test in test_cases:
        print(f'{test}')
        kml = ParseKML(test)
        kml.find_next(":")
        kml.push()
        tag_name = kml.prev_word()
        kml.pop()
        content = kml.next_tag_content(tag_name)

        print(f'{tag_name}={content}')


if __name__ == "__main__":
    # prev_word()
    # next_sentence()
    test_next_word()
