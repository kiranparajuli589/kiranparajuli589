#!/bin/bash

# Quick image optimization script
# Optimizes project images to under 150KB

echo "🎨 Optimizing project images..."
echo ""

# Files to optimize
FILES=(
    "public/projects/vue-spotify.png"
    "public/projects/sachchai-kendra-nepal.png"
    "public/projects/foodswipe.png"
    "public/projects/bagmati-nepal-sports.png"
    "public/projects/rentShare.png"
    "public/projects/vue-formik.png"
    "public/projects/wordclub.png"
)

# Check if pngquant is installed
if command -v pngquant &> /dev/null; then
    echo "✅ Using pngquant for optimization"
    echo ""
    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            size_before=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            size_kb_before=$(echo "$size_before / 1024" | bc)
            echo "Optimizing: $(basename "$file") (${size_kb_before}KB)"

            pngquant --quality=65-80 --speed=1 --ext .png --force "$file"

            if [ $? -eq 0 ]; then
                size_after=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
                size_kb_after=$(echo "$size_after / 1024" | bc)
                reduction=$(echo "scale=1; ($size_kb_before - $size_kb_after) * 100 / $size_kb_before" | bc)
                echo "  ✅ Reduced to ${size_kb_after}KB (${reduction}% reduction)"
            fi
        fi
    done
elif command -v convert &> /dev/null; then
    echo "✅ Using ImageMagick for optimization"
    echo ""
    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            size_before=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            size_kb_before=$(echo "$size_before / 1024" | bc)
            echo "Optimizing: $(basename "$file") (${size_kb_before}KB)"

            convert "$file" -strip -resize 1200x1200\> -quality 85 "$file"

            if [ $? -eq 0 ]; then
                size_after=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
                size_kb_after=$(echo "$size_after / 1024" | bc)
                echo "  ✅ Optimized to ${size_kb_after}KB"
            fi
        fi
    done
else
    echo "❌ Neither pngquant nor ImageMagick is installed"
    echo ""
    echo "Install one of them:"
    echo "  brew install pngquant      (recommended)"
    echo "  brew install imagemagick"
    echo ""
    echo "Or use online tools:"
    echo "  https://tinypng.com/"
    exit 1
fi

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📊 Checking final sizes..."
find public/projects -name "*.png" -exec sh -c 'size=$(stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null); size_kb=$(echo "$size / 1024" | bc); printf "  %.1fKB - %s\n" "$size_kb" "$1"' _ {} \; | sort -t'K' -k1 -nr

