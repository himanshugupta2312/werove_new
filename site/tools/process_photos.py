"""Turns the originals in ../New assets/Locations into web-ready copies.

  - strips ALL metadata (GPS, camera, lens): saving a fresh WebP carries none of it
  - writes three sizes per photo into public/img/photos/<place>/   (-xl only for hero picks, -lg, -md)
  - writes src/data/photos.json describing every photo (title comes from the file name you chose)

Run from the site/ folder:   python tools/process_photos.py
Re-run any time you add or rename photos. Originals are never modified and are never committed.
"""
import json, os, re, sys
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
SRC = os.path.join(os.path.dirname(SITE), 'New assets', 'Locations')
OUT = os.path.join(SITE, 'public', 'img', 'photos')
DATA = os.path.join(SITE, 'src', 'data', 'photos.json')

PLACES = {  # folder name -> (slug, display name)
    'Tadoba': ('tadoba', 'Tadoba-Andhari'),
    'Pench': ('pench', 'Pench'),
    'Jim Corbett NP': ('corbett', 'Jim Corbett'),
    'Sattal': ('sattal', 'Sattal'),
    'Dharamshala': ('dharamshala', 'Dharamshala'),
    'Chakki Mod - Birding': ('chakki-mod', 'Chakki Mod'),
    'Bor Tiger Reserve': ('bor', 'Bor Tiger Reserve'),
    'Ranthambore': ('ranthambore', 'Ranthambore'),
}
# Files still carrying a camera name. title / kind / id. `confirm` = my guess, to be confirmed by you.
UNNAMED = {
    ('tadoba', 'DSC_0122'): ('Tigress with cubs', 'mammal', 'tigress-with-cubs', False),
    ('pench', 'IMG_6301'): ('Tiger', 'mammal', 'tiger-1', False),
    ('pench', 'IMG_6309'): ('Tiger by the water', 'mammal', 'tiger-2', False),
    ('pench', 'IMG_6465'): ('Tiger resting', 'mammal', 'tiger-3', False),
    ('corbett', 'IMG_7993'): ('Safari jeep and elephant', 'scene', 'jeep-and-elephant', False),
    ('sattal', 'IMG_6348'): ('Verditer Flycatcher', 'bird', 'verditer-flycatcher', True),
    ('dharamshala', '_M9A2845'): ('Pink-browed Rosefinch', 'bird', 'pink-browed-rosefinch', True),
    ('dharamshala', '_M9A4923'): ('Verditer Flycatcher', 'bird', 'verditer-flycatcher', True),
    ('chakki-mod', '_M9A2035'): ('Red-billed Leiothrix', 'bird', 'red-billed-leiothrix', True),
    ('chakki-mod', '_M9A2367'): ('White-crested Laughingthrush', 'bird', 'white-crested-laughingthrush', True),
    ('bor', '_M9A0443'): ('Leopard', 'mammal', 'leopard', False),
    ('bor', '_M9A0531'): ('Sloth Bear', 'mammal', 'sloth-bear', False),
}
MAMMALS = {'golden jackal', 'mountain weasel', 'tiger', 'leopard', 'sloth bear', 'elephant'}
CAMERA = re.compile(r'^(IMG_|_M9A|DSC_|Edit_|Corbett_|Sattal_\d|\d{4,})', re.I)
HERO_XL = {'tadoba-tigress-with-cubs', 'pench-tiger-2', 'bor-leopard', 'bor-sloth-bear', 'pench-malabar-pied-hornbill', 'sattal-red-billed-leiothrix'}
MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

def slug(s): return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', s.lower())).strip('-')

def shot_date(im):
    try:
        ex = im.getexif(); d = ex.get_ifd(0x8769).get(36867) or ex.get(306)
        y, m = str(d)[:4], int(str(d)[5:7]); return f'{MONTHS[m - 1]} {y}'
    except Exception:
        return ''

def save(im, path, long_side, q):
    w, h = im.size; k = min(1, long_side / max(w, h))
    out = im.resize((round(w * k), round(h * k)), Image.LANCZOS) if k < 1 else im
    out.save(path, 'WEBP', quality=q, method=6)          # no exif= argument, so nothing is carried over

def main():
    photos = []
    for folder, (pslug, pname) in PLACES.items():
        d = os.path.join(SRC, folder)
        if not os.path.isdir(d): continue
        os.makedirs(os.path.join(OUT, pslug), exist_ok=True)
        for f in sorted(os.listdir(d)):
            stem, ext = os.path.splitext(f)
            if ext.lower() not in ('.jpg', '.jpeg', '.png'): continue
            im0 = Image.open(os.path.join(d, f)); date = shot_date(im0)
            im = ImageOps.exif_transpose(im0).convert('RGB')
            if CAMERA.match(stem):
                if (pslug, stem) not in UNNAMED: print('  ! unnamed, skipped:', pslug, f); continue
                title, kind, pid, confirm = UNNAMED[(pslug, stem)]
            else:
                title = re.sub(r'\s+', ' ', stem).strip(); title = title[0].upper() + title[1:]
                kind = 'mammal' if title.lower() in MAMMALS else 'bird'; pid = slug(title); confirm = False
            pid = f'{pslug}-{pid}'
            if any(p['id'] == pid for p in photos): pid += '-2'
            base = os.path.join(OUT, pslug, pid[len(pslug) + 1:])
            save(im, base + '-lg.webp', 1700, 80); save(im, base + '-md.webp', 800, 76)
            xl = pid in HERO_XL
            if xl: save(im, base + '-xl.webp', 2400, 80)
            w, h = im.size
            photos.append({'id': pid, 'place': pslug, 'placeName': pname, 'title': title, 'kind': kind, 'date': date, 'w': w, 'h': h,
                           'src': f'/img/photos/{pslug}/{pid[len(pslug) + 1:]}', 'xl': xl, 'confirm': confirm,
                           'alt': f'{title}, {pname}'})
            print('ok ', pid, f'{w}x{h}', date)
    os.makedirs(os.path.dirname(DATA), exist_ok=True)
    json.dump(photos, open(DATA, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    tot = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(OUT) for f in fs)
    print(f'\n{len(photos)} photos, {tot / 1e6:.1f} MB written to public/img/photos; metadata -> src/data/photos.json')

main()
