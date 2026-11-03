"""One-off helper that produced src/styles/global.css from the approved mockup stylesheet
(mockups/combo.css): keeps the Cinema variant, drops the other three looks and unused blocks."""
import re, sys

src = open(sys.argv[1], encoding='utf-8').read()
src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)

def chunks(text):
    out, depth, start = [], 0, 0
    for i, ch in enumerate(text):
        if ch == '{': depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0: out.append(text[start:i + 1].strip()); start = i + 1
    return [c for c in out if c]

DROP = re.compile(r'\.(v1|v2|v3)\b|\.crew2|\.cm\b|\.portrait|\.phnote|\.crewnote|\.trust|\.dcard|\.grid\b|\.ask\b|\.note\b|\.notes\b|\.draft|\.imgs img:first|\.ci\b|\.crew\b|\.asks|\.creds|\.promise|\.stage|\.mapbg|\.pagemap|\.mlist')

def keep(chunk):
    sel = chunk.split('{', 1)[0]
    if sel.strip().startswith('@media'):
        inner = chunk[chunk.index('{') + 1: chunk.rindex('}')]
        kept = [c for c in chunks(inner) if keep(c)]
        return bool(kept)
    return not DROP.search(sel)

def filt(chunk):
    sel = chunk.split('{', 1)[0]
    if sel.strip().startswith('@media'):
        inner = chunk[chunk.index('{') + 1: chunk.rindex('}')]
        return sel.strip() + '{' + ''.join(filt(c) + '\n' for c in chunks(inner) if keep(c)) + '}'
    return chunk

out = [filt(c) for c in chunks(src) if keep(c)]
css = '\n'.join(out)
css = css.replace('body.v4', 'body').replace('.v4 ', '')
open(sys.argv[2], 'w', encoding='utf-8').write(css + '\n')
print(len(out), 'rules kept,', len(css), 'bytes')
