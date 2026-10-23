# Pull the readable text blocks of a built page (inside <main>, falling back to <body>) in document order -
# headings, paragraphs, list items, table cells, captions - as (tag, text) pairs, for make_review_pack.py.
import re, sys
from html.parser import HTMLParser

BLOCK = {'h1', 'h2', 'h3', 'h4', 'p', 'li', 'td', 'th', 'caption', 'summary', 'figcaption', 'dt', 'dd', 'blockquote'}
SKIP = {'script', 'style', 'noscript', 'svg', 'template'}

class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.out, self.buf, self.skip, self.in_main, self.saw_main = [], [], [], 0, 0, False
    def handle_starttag(self, tag, attrs):
        if tag in SKIP: self.skip += 1
        if tag == 'main': self.in_main += 1; self.saw_main = True
        if tag in BLOCK:
            self.flush(); self.stack.append(tag)
        if tag == 'br': self.buf.append(' ')
    def handle_endtag(self, tag):
        if tag in SKIP: self.skip -= 1
        if tag in BLOCK and self.stack:
            self.flush(); self.stack.pop()
        if tag == 'main': self.in_main -= 1
    def handle_data(self, data):
        if self.skip: return
        self.buf.append(data)
    def flush(self):
        text = re.sub(r'\s+', ' ', ''.join(self.buf)).strip()
        self.buf = []
        if text and self.stack:
            self.out.append((self.stack[-1], text, self.in_main > 0))

def blocks(path):
    p = Blocks(); p.feed(open(path, encoding='utf-8').read())
    rows = [(t, x) for t, x, m in p.out if m] if p.saw_main else [(t, x) for t, x, m in p.out]
    return rows

if __name__ == '__main__':
    for t, x in blocks(sys.argv[1]): print(f'{t:8} {x[:150]}')
