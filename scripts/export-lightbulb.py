"""Export lightbulb blend to optimized GLB and copy textures to public/."""
import bpy
import os
import shutil

BASE = bpy.path.abspath("//")
PROJECT_ROOT = os.path.abspath(os.path.join(BASE, ".."))
PUBLIC = os.path.join(PROJECT_ROOT, "public")
MODELS_DIR = os.path.join(PUBLIC, "models")
TEXTURES_DIR = os.path.join(PUBLIC, "textures")
SRC_TEX = os.path.join(BASE, "textures")

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(TEXTURES_DIR, exist_ok=True)

MAX_TEX_SIZE = 1024

# Downscale images in blend before export
for img in bpy.data.images:
    if img.size[0] > MAX_TEX_SIZE or img.size[1] > MAX_TEX_SIZE:
        img.scale(MAX_TEX_SIZE, MAX_TEX_SIZE)
        print(f"Scaled {img.name} to {MAX_TEX_SIZE}px")

glb_path = os.path.join(MODELS_DIR, "lightbulb.glb")
bpy.ops.export_scene.gltf(
    filepath=glb_path,
    export_format="GLB",
    export_apply=True,
    export_texcoords=True,
    export_normals=True,
    export_materials="EXPORT",
    export_image_format="JPEG",
    export_jpeg_quality=85,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)

mapping = {
    "lightbulb_01_diff_4k.jpg": "lightbulb_diff.jpg",
    "lightbulb_01_emissive_4k.png": "lightbulb_emissive.png",
    "lightbulb_01_rough_4k.exr": "lightbulb_rough.exr",
    "lightbulb_01_metal_4k.exr": "lightbulb_metal.exr",
    "lightbulb_01_nor_gl_4k.exr": "lightbulb_normal.exr",
    "lightbulb_01_alpha_4k.png": "lightbulb_alpha.png",
}

for src_name, dst_name in mapping.items():
    src = os.path.join(SRC_TEX, src_name)
    dst = os.path.join(TEXTURES_DIR, dst_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)

size_mb = os.path.getsize(glb_path) / (1024 * 1024)
print(f"Exported GLB to {glb_path} ({size_mb:.1f} MB)")
