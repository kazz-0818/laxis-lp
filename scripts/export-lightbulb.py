"""Export lightbulb blend to GLB for web."""
import bpy
import os

BASE = bpy.path.abspath("//")
PROJECT_ROOT = os.path.abspath(os.path.join(BASE, ".."))
MODELS_DIR = os.path.join(PROJECT_ROOT, "public", "models")
os.makedirs(MODELS_DIR, exist_ok=True)

MAX_TEX_SIZE = 1024
for img in bpy.data.images:
    if img.size[0] > MAX_TEX_SIZE or img.size[1] > MAX_TEX_SIZE:
        img.scale(MAX_TEX_SIZE, MAX_TEX_SIZE)

glb_path = os.path.join(MODELS_DIR, "lightbulb.glb")
bpy.ops.export_scene.gltf(
    filepath=glb_path,
    export_format="GLB",
    export_apply=True,
    export_image_format="JPEG",
    export_jpeg_quality=85,
    export_draco_mesh_compression_enable=True,
)
print(f"Exported: {glb_path}")
