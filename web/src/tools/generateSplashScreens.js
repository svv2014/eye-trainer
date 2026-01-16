#!/usr/bin/env node

/**
 * Splash Screen Generator for iOS PWA
 *
 * This script generates iOS splash screens for different device sizes.
 * Run: node web/src/tools/generateSplashScreens.js
 *
 * Prerequisites:
 * - Install sharp: npm install sharp --save-dev
 * - Have a source icon (512x512 or larger) at web/src/icon.png
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// iOS device splash screen sizes
const SPLASH_SIZES = [
    { name: 'iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait', width: 1290, height: 2796 },
    { name: 'iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait', width: 1179, height: 2556 },
    { name: 'iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait', width: 1284, height: 2778 },
    { name: 'iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait', width: 1170, height: 2532 },
    { name: 'iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait', width: 1125, height: 2436 },
    { name: 'iPhone_11_Pro_Max__iPhone_XS_Max_portrait', width: 1242, height: 2688 },
    { name: 'iPhone_11__iPhone_XR_portrait', width: 828, height: 1792 },
    { name: 'iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait', width: 1242, height: 2208 },
    { name: 'iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait', width: 750, height: 1334 },
    { name: '4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait', width: 640, height: 1136 },
    { name: '12.9__iPad_Pro_portrait', width: 2048, height: 2732 },
    { name: '11__iPad_Pro__10.5__iPad_Pro_portrait', width: 1668, height: 2388 },
    { name: '10.9__iPad_Air_portrait', width: 1640, height: 2360 },
    { name: '10.5__iPad_Air_portrait', width: 1668, height: 2224 },
    { name: '10.2__iPad_portrait', width: 1620, height: 2160 },
    { name: '9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait', width: 1536, height: 2048 }
];

// Theme colors
const BACKGROUND_COLOR = '#1a1a2e';
const THEME_COLOR = '#67C5D5';

async function generateSplashScreens() {
    const srcDir = path.resolve(__dirname, '..');
    const outputDir = path.join(srcDir, 'splash');
    const iconPath = path.join(srcDir, 'icon.png');

    // Create splash directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('🎨 Generating iOS splash screens...\n');

    for (const size of SPLASH_SIZES) {
        const outputPath = path.join(outputDir, `${size.name}.png`);

        try {
            // Create a canvas with the background color
            const canvas = sharp({
                create: {
                    width: size.width,
                    height: size.height,
                    channels: 4,
                    background: BACKGROUND_COLOR
                }
            });

            // Calculate icon size (20% of screen width)
            const iconSize = Math.floor(size.width * 0.2);

            // Resize and position icon in center
            const icon = await sharp(iconPath)
                .resize(iconSize, iconSize, { fit: 'contain' })
                .toBuffer();

            // Composite icon onto canvas
            await canvas
                .composite([{
                    input: icon,
                    top: Math.floor((size.height - iconSize) / 2),
                    left: Math.floor((size.width - iconSize) / 2)
                }])
                .png()
                .toFile(outputPath);

            console.log(`✅ Generated: ${size.name}.png (${size.width}x${size.height})`);
        } catch (error) {
            console.error(`❌ Error generating ${size.name}:`, error.message);
        }
    }

    console.log('\n✨ Splash screen generation complete!');
}

// Run the generator
if (require.main === module) {
    generateSplashScreens().catch(console.error);
}

module.exports = { generateSplashScreens };
