#!/bin/bash

# Simple Image Optimization Script
# This script optimizes images to be under 150KB

echo "🔍 Checking for images larger than 150KB..."
echo ""

# Find and list large images
large_images=$(find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -exec sh -c 'size=$(stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null); size_kb=$(echo "$size / 1024" | bc); if (( $(echo "$size_kb > 150" | bc -l) )); then echo "$size_kb|$1"; fi' _ {} \;)

if [ -z "$large_images" ]; then
    echo "✅ All images are under 150KB!"
    exit 0
fi

echo "🔴 Found large images:"
echo "$large_images" | while IFS='|' read -r size file; do
    printf "  %.1fKB - %s\n" "$size" "$file"
done
echo ""

echo "📋 To optimize these images, run one of the following:"
echo ""
echo "Option 1: Using pngquant (Recommended)"
echo "  brew install pngquant"
echo "  for img in $(echo "$large_images" | cut -d'|' -f2); do pngquant --quality=65-80 \$img; done"
echo ""
echo "Option 2: Using ImageMagick"
echo "  brew install imagemagick"
echo "  for img in $(echo "$large_images" | cut -d'|' -f2); do convert \$img -strip -resize 1200x1200\> -quality 85 \$img; done"
echo ""
echo "Option 3: Use online tools like TinyPNG (https://tinypng.com/)"
echo ""
echo "📄 See IMAGE_OPTIMIZATION.md for detailed instructions"
