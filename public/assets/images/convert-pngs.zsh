#!/usr/bin/env zsh
setopt EXTENDED_GLOB NULL_GLOB

# Ensure cwebp is available
if ! command -v cwebp &>/dev/null; then
  echo "Error: cwebp (from libwebp) is required. Install it with your package manager."
  exit 1
fi

# Recursively convert every .png → .webp
for png in **/*.png; do
  webp="${png:r}.webp"
  
  # Skip if webp exists and is newer than the png
  if [[ -f "$webp" && "$webp" -nt "$png" ]]; then
    echo "⏭  Skipping up-to-date: $webp"
    continue
  fi

  echo "🔄 Converting: $png → $webp"
  cwebp -lossless "$png" -o "$webp"
done

echo "✅ Conversion complete!"