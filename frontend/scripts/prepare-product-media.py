"""Prepare client-approved product assets. Originals stay in the supplied ZIP.

Run with the bundled Python runtime and pass the ZIP and Roller.mp4 paths.
Images are resized/re-encoded only; no generative edits are performed.
"""
import io
import shutil
import sys
import zipfile
from pathlib import Path
from PIL import Image, ImageOps

public = Path(__file__).resolve().parents[1] / 'public'
assets = {
    'Roller .jpg': ('roller-screw', 'assembly'),
    'Roller SNS.png': ('roller-screw', 'social'),
    'ロボットハンド.png': ('robotic-hand', 'food-handling'),
    'Product Image 1.png': ('robotic-hand', 'applications'),
    'Robot Hand Image 2.png': ('robotic-hand', 'precision-handling'),
    'Robot Hand.png': ('robotic-hand', 'social'),
}
with zipfile.ZipFile(sys.argv[1]) as archive:
    for entry in archive.infolist():
        filename = entry.filename.rsplit('/', 1)[-1]
        if filename not in assets:
            continue
        category, name = assets[filename]
        target = public / 'images' / 'products' / category
        target.mkdir(parents=True, exist_ok=True)
        source = ImageOps.exif_transpose(Image.open(io.BytesIO(archive.read(entry))))
        for width in (640, 1600):
            photo = source.copy()
            photo.thumbnail((width, width), Image.Resampling.LANCZOS)
            path = target / f'{name}-{width}.webp'
            photo.save(path, 'WEBP', quality=87, method=6)
            print(f'{path.name}: {photo.size}, {path.stat().st_size:,} bytes')
video_dir = public / 'videos' / 'products' / 'roller-screw'
video_dir.mkdir(parents=True, exist_ok=True)
shutil.copy2(sys.argv[2], video_dir / 'demonstration.mp4')
