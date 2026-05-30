"""Downscale HDRI EXR and export darkened WebP background for LAXIS LP."""
import bpy
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "citrus_orchard_puresky_4k.exr")
HDR_DIR = os.path.join(ROOT, "public", "hdr")
IMG_DIR = os.path.join(ROOT, "public", "images")
os.makedirs(HDR_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

if not os.path.exists(SRC):
    SRC = os.path.join(ROOT, "public", "hdr", "citrus_orchard_puresky_4k.exr")

img = bpy.data.images.load(SRC, check_existing=False)
# 2K equirectangular width
target_w = 2048
aspect = img.size[0] / img.size[1]
target_h = max(1, int(target_w / aspect))
img.scale(target_w, target_h)

exr_out = os.path.join(HDR_DIR, "citrus_orchard_puresky_2k.exr")
img.file_format = "OPEN_EXR"
img.filepath_raw = exr_out
img.save()

# Darkened webp for CSS / mobile fallback
webp_out = os.path.join(IMG_DIR, "citrus_orchard_bg.webp")
img.file_format = "WEBP"
img.filepath_raw = webp_out
img.save()
print(f"EXR: {exr_out}")
print(f"WebP: {webp_out}")
