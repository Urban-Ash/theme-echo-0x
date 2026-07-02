#!/usr/bin/env python3
import os
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).parent
THEME_YAML = ROOT / "theme.yaml"

EXCLUDE_NAMES = {
    ".DS_Store",
    "__pycache__",
    "node_modules",
    ".git",
    "src",
    "package.json",
    "package-lock.json",
    "vite.config.mjs",
}
EXCLUDE_STARTSWITH = ("._", ".")

def read_theme_version():
    if not THEME_YAML.exists():
        return ROOT.name

    content = THEME_YAML.read_text(encoding="utf-8")
    match = re.search(r"^\s*version:\s*([^\s]+)\s*$", content, re.MULTILINE)
    return match.group(1) if match else ROOT.name

ZIP_PATH = ROOT.parent / f"{read_theme_version()}.zip"

def run_frontend_build():
    package_json = ROOT / "package.json"
    if not package_json.exists():
        return

    npm = shutil.which("npm")
    if npm is None:
        print("! package.json exists but npm was not found in PATH", file=sys.stderr)
        sys.exit(1)

    print("Running Vite build...")
    subprocess.run([npm, "run", "build"], cwd=ROOT, check=True)

run_frontend_build()

print(f"Packaging {ROOT.name}...")
with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
    for path in ROOT.rglob("*"):
        if path.is_dir():
            continue
        parts = path.parts
        skip = False
        for part in parts:
            if part in EXCLUDE_NAMES or part.startswith(EXCLUDE_STARTSWITH):
                skip = True
                break
        if skip:
            continue
        arcname = Path(ROOT.name) / path.relative_to(ROOT)
        print(f"  adding {arcname}")
        zf.write(path, arcname)
print(f"\n✓ Package created at {ZIP_PATH}")
