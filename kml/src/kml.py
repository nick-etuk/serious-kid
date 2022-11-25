import os
from constants import TAG_TYPE
from icecream import ic
#from lib import named_tuple_factory
#from init import init, log


class KML:
    def __init__(self, content: str):
        content = content.replace("::", "~~")
        self.content = content
        self.cursor_pos = 0
        self.stack = []

        self.word_boundaries = [' ', '.', ',', ';', ':', '!', "\n"]
        self.sentence_boundaries = ['.', '?', "\n"]

        self.tag_info = {
            'keyword': {
                'get_content': self.next_word,
                'code': 'K',
                'type': TAG_TYPE['word']
            },
            'hard': {
                'get_content': self.next_word,
                'code': 'H',
                'type': TAG_TYPE['word']
            },
            'topic': {
                'get_content': self.next_word,
                'code': 'T',
                'type': TAG_TYPE['word']
            },
            'amazing': {
                'get_content': self.next_sentence,
                'code': 'AM',
                'type': TAG_TYPE['sentence']
            },
            'question': {
                'get_content': self.next_sentence,
                'code': 'Q',
                'type': TAG_TYPE['sentence']
            },
            'answers': {
                'get_content': self.next_sentence,
                'code': 'A',
                'type': TAG_TYPE['sentence']
            },
            'heading': {
                'get_content': self.next_sentence,
                'code': 'HE',
                'type': TAG_TYPE['sentence']
            },
            'unknown': {
                'get_content': self.unknown_tag,
                'code': '',
                'type': TAG_TYPE['unknown']
            }
        }

        self.tag_full_name = {
            'q': 'question',
            'a': 'answers',
            'answer': 'answers',
            'k': 'keyword',
            'h': 'hard'
        }

    def unknown_tag(self):
        return 'unknown'

    def fullname(self, tag):
        tag = tag.lower()
        if not tag in self.tag_info:
            if not tag in self.tag_full_name:
                print(f'unknown tag [{tag}]')
                return 'unknown'
            return self.tag_full_name[tag]
        return tag

    def get_tag_code(self, tag):
        return self.tag_info[self.fullname(tag)]['code']

    def get_tag_type(self, tag):
        return self.tag_info[tag]['type']

    def get_pos(self):
        return self.cursor_pos

    def get_content(self):
        return self.content

    def delete_chars(self, start, length):
        # print(f'=>delete_chars')
        #print(f'old content[{self.content}]')
        end = start + length
        before = self.content[0:start]
        after = self.content[end:]
        after = after.replace(':', ' ', 1)
        self.content = before + after
        # print(f'before[{before}]')
        # print(f'after[{after}]')
        #print(f'new content[{self.content}]')
        if self.cursor_pos <= start:
            pass
        if self.cursor_pos > end:
            self.cursor_pos -= length
        if start <= self.cursor_pos <= end:
            self.cursor_pos = start

    def push(self):
        self.stack.append(self.cursor_pos)

    def pop(self):
        self.cursor_pos = self.stack.pop()
        #print(f'cursor restored to {self.cursor_pos}')

    def find_next(self, str: str):
        result = self.content.find(str, self.cursor_pos + 1)
        if result != -1:
            # don't add 1 if we are at the end of the text
            if result == len(self.content):
                self.cursor_pos = result
            else:
                self.cursor_pos = result
            return True
        return False

    def prev_word(self):
        result = ''
        start = self.cursor_pos - 1
        end = self.cursor_pos - 1
        char = self.content[start]
        while start > 0 and self.content[start] not in self.word_boundaries:
            char = self.content[start]
            start -= 1
        #if start > 0:start += 1
        result = self.content[start:end + 1]
        self.cursor_pos = start
        return result.strip()

    def z_prev_word(self):
        result = ''
        end = self.cursor_pos
        start = 0
        for boundary in self.word_boundaries:
            end = self.content.find(boundary)
            if end:
                break
        if not end:
            end = len(self.content)

        result = self.content[start:end]
        return result.strip()

    def next_word(self):
        result = ""
        i = self.cursor_pos + 1
        max_len = len(self.content)
        while i > 0 and i < max_len and self.content[i] not in self.word_boundaries:
            i += 1

        result = self.content[self.cursor_pos + 1:i]
        self.cursor_pos = i
        return result.strip()

    def old_next_sentence(self):
        result = ""
        i = self.cursor_pos + 1
        end = len(self.content)
        while i > 0 and i < end and self.content[i] not in self.sentence_boundaries:
            char = self.content[i]
            i += 1

        result = self.content[self.cursor_pos + 1:i]
        self.cursor_pos = i
        return result.strip()

    def next_sentence(self):
        result = ''
        start = self.cursor_pos + 1
        end = 0
        for boundary in self.sentence_boundaries:
            end = self.content.find(boundary)
            if end >= 0:
                break
        if end <= 0:
            end = len(self.content) - 1

        result = self.content[start:end + 1]
        # self.cursor_pos = end + 1
        return result.strip()

    def prev_sentence(self):
        result = ""
        i = self.cursor_pos
        while i >= 0 and self.content[i] not in self.sentence_boundaries:
            i -= 1

        result = self.content[i:self.cursor_pos]
        self.cursor_pos = i
        return result.strip()

    def next_tag_content(self, tag: str) -> str:
        return self.tag_info[self.fullname(tag)]['get_content']()
