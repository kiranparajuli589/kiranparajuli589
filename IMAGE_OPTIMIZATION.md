# Image Optimization Guide

## Current Large Images (> 150KB)

### Project Screenshots (Needs Optimization)
- `public/projects/vue-spotify.png` - **3.3MB** 🔴
- `public/projects/sachchai-kendra-nepal.png` - **3.0MB** 🔴
- `public/projects/foodswipe.png` - **2.4MB** 🔴
- `public/projects/bagmati-nepal-sports.png` - **1.5MB** 🔴
- `public/projects/rentShare.png` - **788KB** 🔴
- `public/projects/vue-formik.png` - **612KB** 🔴
- `public/projects/wordclub.png` - **341KB** 🔴
- `public/projects/vue-ytframe.png` - **120KB** ✅

### Recommended Actions

1. **Optimize Images to < 150KB**

   Option A: Using pngquant (Recommended)
   ```bash
   # Install pngquant
   brew install pngquant  # macOS
   # or
   sudo apt install pngquant  # Linux
   
   # Optimize each large image
   pngquant --quality=65-80 --speed=1 --strip vue-spotify.png
   ```

   Option B: Using ImageMagick
   ```bash
   # Install ImageMagick
   brew install imagemagick
   
   # Resize and optimize
   convert vue-spotify.png -strip -resize 1200x1200\> -quality 85 vue-spotify.png
   ```

   Option C: Using Online Tools
   - [TinyPNG](https://tinypng.com/) - Drag and drop
   - [Squoosh](https://squoosh.app/) - Advanced compression
   - [Compressor.io](https://compressor.io/) - Various formats

2. **Convert to WebP Format** (Best Option)
   ```bash
   # Install cwebp
   brew install webp
   
   # Convert PNG to WebP (80-90% smaller)
   cwebp -q 80 vue-spotify.png -o vue-spotify.webp
   ```

3. **Use the Optimization Script**
   ```bash
   chmod +x scripts/optimize-images.sh
   ./scripts/optimize-images.sh
   ```

## Display Size Constraints

Components are already optimized for performance:

- **Avatar**: 160px × 160px (displays at 300px max)
- **Project Thumbnails**: max-height 256px
- **Company Logos**: 24px × 24px
- **Badge Images**: max 100px width
- **Tech Icons**: 64px × 64px fixed

## Target File Sizes

- **Project Screenshots**: < 100KB each
- **Company Logos**: < 50KB each
- **Tech Icons**: < 30KB each
- **Badges**: < 50KB each

## Implementation Steps

1. Run the optimization script:
   ```bash
   cd /Users/kiran/IdeaProjects/kiranparajuli589
   ./scripts/optimize-images.sh
   ```

2. Check file sizes:
   ```bash
   find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.webp" \) \
     -exec ls -lh {} \; | awk '{print $5, $9}' | sort -hr
   ```

3. Verify all images are under 150KB

4. Test the website to ensure images still look good

## Manual Optimization Commands

### For each large file:
```bash
# Resize to reasonable dimensions (1200px max width)
convert vue-spotify.png -strip -resize 1200x1200\> -quality 85 vue-spotify.png

# Or convert to WebP (smaller and better quality)
cwebp -q 80 vue-spotify.png -o vue-spotify.webp
```

## Benefits of Optimization

- ✅ Faster page loads
- ✅ Better Core Web Vitals scores
- ✅ Reduced bandwidth usage
- ✅ Improved user experience
- ✅ Better SEO rankings

