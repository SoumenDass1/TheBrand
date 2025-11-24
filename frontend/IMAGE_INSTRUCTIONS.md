# How to Add Fashion Model Images

## What You Need

I've hit the image generation quota, but here's how to add your own model images:

### 1. TheBrand Logo (Already Have!)
You provided the TB logo: ![TB Logo](file:///Users/soumen.dass2024nst.rishihood.edu.in/.gemini/antigravity/brain/a8e6a4b7-d1d9-4d53-b8dd-d834e44a039a/uploaded_image_1763959757557.png)

### 2. Images Needed

**For Login Page (Girl Model):**
- Professional photo of a girl/woman in premium clothing
- Wearing navy blue and/or gold outfit
- Holding a shopping bag with TB logo
- Fashionable pose showing off clothes
- Clean background (white or studio)
- Full body or 3/4 shot

**For Signup Page (Boy Model):**
- Professional photo of a boy/man in premium menswear
- Wearing sophisticated navy/gold outfit  
- Holding shopping bag with TB logo
- Different dynamic pose
- Clean background
- Full body or 3/4 shot

## How to Add Images

### Option 1: Use AI Image Generators (Recommended)
Try these free tools:
- **Leonardo.ai** - Great for realistic fashion photography
- **Midjourney** (via Discord)
- **Bing Image Creator**
- **Stable Diffusion**

**Prompts to use:**

For Girl (Login):
```
Professional fashion photography, confident young woman in elegant navy blue and gold designer outfit, holding luxury shopping bag with "TB" gold logo, striking fashionable pose, studio lighting, white background, full body shot, realistic, high-end fashion model, no text overlays
```

For Boy (Signup):
```
Professional fashion photography, stylish young man in sophisticated navy blue and gold menswear, holding luxury shopping bag with "TB" gold logo, dynamic confident pose, studio lighting, white background, full body shot, realistic, male fashion model, no text overlays
```

### Option 2: Use Stock Photos
- **Unsplash.com** - Free high-quality photos
- **Pexels.com** - Free stock images
- Search for: "fashion model shopping bag" or "luxury fashion portrait"
- Edit to add TB logo on shopping bag using Photoshop/Canva

### Option 3: Photoshoot
- Take photos with models
- Add TB logo to shopping bags
- Use good lighting
- Clean background

## Installation Steps

Once you have the images:

1. **Save images as:**
   - `login-model.png` (girl with shopping bag)
   - `signup-model.png` (boy with shopping bag)

2. **Copy to public folder:**
   ```bash
   cp login-model.png /Users/soumen.dass2024nst.rishihood.edu.in/Desktop/Projects/TheBrand/frontend/public/
   cp signup-model.png /Users/soumen.dass2024nst.rishihood.edu.in/Desktop/Projects/TheBrand/frontend/public/
   ```

3. **Update Login.jsx:**
   Change line 86:
   ```javascript
   style={{backgroundImage: 'url(/login-model.png)'}}
   ```

4. **Update Signup.jsx:**
   Change line 35:
   ```javascript
   style={{backgroundImage: 'url(/signup-model.png)'}}
   ```

## Current Animation Features

✅ **Enhanced Bouncy Effect:**
- Slides from 120% off-screen (very visible!)
- Multiple bounce points at 50%, 70%, 85%
- Spring-like cubic-bezier easing
- 1.2 second duration (slower, more dramatic)
- Scale effects for emphasis

✅ **Animation Keyframes:**
- Starts at 120% translateX
- Bounces to -15px at 50%
- Counter-bounce to 8px at 70%
- Micro-bounce to -3px at 85%
- Settles perfectly at 0 at 100%

The animation is now VERY bouncy and visible!

## Tips for Best Results

1. **Image Quality:**
   - High resolution (at least 1920x1080)
   - Professional lighting
   - Clean, uncluttered background

2. **TB Logo on Bag:**
   - Make sure logo is clearly visible
   - Gold color matching the theme
   - Professional placement

3. **Model Poses:**
   - Girl: Elegant, confident, showing outfit
   - Boy: Different pose, dynamic, stylish
   - Both should look natural and premium

4. **Color Coordination:**
   - Navy blue and gold in outfits
   - Matches the website theme
   - Professional, luxury aesthetic

## Test the Animation

After adding images, navigate between:
- http://localhost:5173/login
- http://localhost:5173/signup

Watch the dramatic bouncy slide animation!
