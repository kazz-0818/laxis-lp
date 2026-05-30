"""Export lightbulb blend to high-quality GLB."""
import bpy
import os

BASE = bpy.path.abspath("//")
PROJECT_ROOT = os.path.abspath(os.path.join(BASE, ".."))
MODELS_DIR = os.path.join(PROJECT_ROOT, "public", "models")
os.makedirs(MODELS_DIR, exist_ok=True)

# 4Kソースを活かす（Web向けに2048まで）
MAX_TEX_SIZE = 2048

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
    export_tangents=True,
    export_materials="EXPORT",
    export_image_format="AUTO",
    export_jpeg_quality=95,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=4,
)

size_mb = os.path.getsize(glb_path) / (1024 * 1024)
print(f"Exported GLB to {glb_path} ({size_mb:.1f} MB)")
