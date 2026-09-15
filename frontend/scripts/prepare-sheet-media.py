"""Optimize client media downloaded from the website-request Google Sheet.

Usage: python prepare-sheet-media.py <download-directory>
The directory should contain the filenames listed in ``images`` below. The
script performs resize/re-encode work only; it does not generate imagery.
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps


source_dir = Path(sys.argv[1]).resolve()
public = Path(__file__).resolve().parents[1] / "public"

images = {
    "about-origin.bin": ("images/home", "about-origin", 1800),
    "global-ecosystem.bin": ("images/home", "global-ecosystem", 1800),
    "why-robofounders.bin": ("images/home", "why-robofounders", 1800),
    "factory.bin": ("images/home", "factory-deployment", 1600),
    "contact.bin": ("images/home", "contact-team", 1400),
    "mariel-new.bin": ("images/team", "mariel", 1000),
    "eiichiro.bin": ("images/team", "eiichiro", 800),
    "hiro-new.bin": ("images/team", "hiro", 800),
    "celine-new.bin": ("images/team", "celine", 800),
    "thao.bin": ("images/team", "thao", 800),
}

for filename, (directory, stem, max_edge) in images.items():
    source_path = source_dir / filename
    if not source_path.exists():
        print(f"Skipping unavailable asset: {filename}")
        continue
    try:
        image = ImageOps.exif_transpose(Image.open(source_path)).convert("RGB")
    except Exception as error:
        print(f"Skipping unreadable asset: {filename} ({error})")
        continue
    image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    target_dir = public / directory
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"{stem}.webp"
    image.save(target, "WEBP", quality=86, method=6)
    print(f"{target.relative_to(public)}: {image.size}, {target.stat().st_size:,} bytes")
