from kml import KML

def prev_word():
    tests = [
        { 
            'condition':'q:what is the name of the biggest volcano?',
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
        kml = KML(test['condition'])
        kml.find_next(":")
        kml.push()
        actual = kml.prev_word()
        kml.pop()

        print(test['condition'])
        print(f"exepected:{test['expected']}   got:{actual}")
        #assert(actual == test['expected'])

def next_sentence():
    test_cases = [
        'q:what is the name of the biggest volcano?',
        'question: where is the north pole? on the other hand, hard:vesper is defined as',
    ]
    
    for content in test_cases:
        kml = KML(content)
        kml.find_next(":")
        kml.push()
        tag = kml.prev_word()
        kml.pop()
        content = kml.next_tag_content(tag)
        print(f'{tag}={content}')



if __name__ == "__main__":
    #prev_word()
    next_sentence()