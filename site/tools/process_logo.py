"""Cuts the day and night badges (and the wordmark) out of the supplied logo image.
The source has a painted checkerboard instead of real transparency, so the background is found by flood-filling
grey pixels in from the edge; the badge's black outline stops the fill from reaching the inside."""
import sys, numpy as np
from collections import deque
from PIL import Image, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else r'C:/Users/himan/Downloads/WeRove_Logo_DayNight.jpg'
OUT = 'public/img/'
im = Image.open(SRC).convert('RGB'); A = np.asarray(im).astype(int)
H, W, _ = A.shape
grey = ((A.max(2) - A.min(2)) <= 16) & (A.mean(2) > 150)

def background(x0, y0, x1, y1):
    g = grey[y0:y1, x0:x1]; h, w = g.shape
    seen = np.zeros_like(g); q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if g[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if g[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and g[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
    return seen

def badge(name, box):
    x0, y0, x1, y1 = box
    bg = background(x0, y0, x1, y1)
    alpha = Image.fromarray(((~bg) * 255).astype('uint8'))
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.8))   # trims the grey fringe, softens the edge
    rgb = im.crop(box).convert('RGBA'); rgb.putalpha(alpha)
    bb = rgb.getbbox(); rgb = rgb.crop(bb)
    rgb.save(OUT + f'logo-{name}.png'); return rgb

def wordmark(box, colour, name):
    x0, y0, x1, y1 = box
    lum = A[y0:y1, x0:x1].mean(2)
    a = np.clip((150 - lum) / 70, 0, 1)                      # dark ink only; the checker squares are lighter than 150
    out = np.zeros((y1 - y0, x1 - x0, 4), 'uint8'); out[..., :3] = colour; out[..., 3] = (a * 255).astype('uint8')
    o = Image.fromarray(out, 'RGBA'); o = o.crop(o.getbbox()); o.save(OUT + f'wordmark-{name}.png'); return o

day = badge('badge-day', (20, 170, 620, 450))
night = badge('badge-night', (600, 170, 1190, 450))
w_day = wordmark((60, 480, 560, 660), (31, 51, 38), 'day')
w_night = wordmark((60, 480, 560, 660), (238, 226, 198), 'night')
print(day.size, night.size, w_day.size)

for n, im2 in (('day', day), ('night', night)):
    for w in (320, 640):
        im2.resize((w, round(im2.height * w / im2.width)), Image.LANCZOS).save(OUT + f'logo-badge-{n}-{w}.png')
# app icons from the day badge on a cream square
def icon(size, path):
    s = Image.new('RGBA', (size, size), (243, 234, 212, 255)); b = day.copy(); r = size * .84 / b.width
    b = b.resize((round(b.width * r), round(b.height * r)), Image.LANCZOS); s.alpha_composite(b, ((size - b.width) // 2, (size - b.height) // 2)); s.convert('RGB').save(path)
icon(512, 'public/icon-512.png'); icon(192, 'public/icon-192.png'); icon(180, 'public/apple-touch-icon.png'); icon(48, 'public/favicon-48.png')
Image.open('public/favicon-48.png').save('public/favicon.ico', sizes=[(48, 48), (32, 32), (16, 16)])
