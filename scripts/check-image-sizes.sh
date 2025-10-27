#!/bin/bash

# Quick script to check which images exceed 150KB

echo "🔍 Checking for images larger than 150KB..."
echo ""

find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) -exec sh -c '
    size=$(stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null)
    size_kb=$(echo "$size / 1024" | bc)
    
    if (( $(echo "$size_kb > 150" | bc -l) )); then
        printf "🔴 %.1fKB - %s\n" "$size_kb" "$1"
    elif (( $(echo "$size_kb > 100" | bc -l) )); then
        printf "🟡 %.1fKB - %s\n" "$size_kb" "$1"
    else
        printf "✅ %.1fKB - %s\n" "$size_kb" "$1"
    fi
' _ {} \; | sort -t' ' -k2 -hr

echo ""
echo "Legend: 🔴 >150KB  🟡 >100KB  ✅ <100KB"

