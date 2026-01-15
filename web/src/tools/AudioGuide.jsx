import { strings } from "../languages/localizationStrings";
import { getAudioEnabled } from "./localStorage";
import {
    ACTION_LEFT,
    ACTION_RIGHT,
    ACTION_UP,
    ACTION_DOWN,
    ACTION_CENTER,
    ACTION_RELAX,
    ACTION_UP_RIGHT,
    ACTION_UP_LEFT,
    ACTION_DOWN_LEFT,
    ACTION_DOWN_RIGHT
} from "./EyeActions";

// Language code mapping for Web Speech API
const languageMap = {
    'en': 'en-US',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'ru': 'ru-RU',
    'uk': 'uk-UA'
};

// Tone frequencies for different directions (in Hz)
// Using musical intervals for pleasant sound
const directionTones = {
    [ACTION_LEFT]: { freq: 330, pan: -0.8 },      // E4, left speaker
    [ACTION_RIGHT]: { freq: 330, pan: 0.8 },      // E4, right speaker
    [ACTION_UP]: { freq: 440, pan: 0 },           // A4, center (higher)
    [ACTION_DOWN]: { freq: 262, pan: 0 },         // C4, center (lower)
    [ACTION_UP_LEFT]: { freq: 392, pan: -0.6 },   // G4
    [ACTION_UP_RIGHT]: { freq: 392, pan: 0.6 },   // G4
    [ACTION_DOWN_LEFT]: { freq: 294, pan: -0.6 }, // D4
    [ACTION_DOWN_RIGHT]: { freq: 294, pan: 0.6 }, // D4
    [ACTION_CENTER]: null,                         // No sound for center
    [ACTION_RELAX]: { freq: 523, pan: 0 },        // C5, completion tone
};

class AudioGuide {
    constructor() {
        this.synth = window.speechSynthesis;
        this.audioContext = null;
        this.enabled = getAudioEnabled();
        this.lastAction = null;
        this.ambientGain = null;
        this.ambientSource = null;
        this.isAmbientPlaying = false;
        this.isUnlocked = false; // Track if audio is unlocked for mobile
    }

    // Initialize Web Audio API context (must be called after user interaction)
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                this.isUnlocked = true;
            });
        } else if (this.audioContext.state === 'running') {
            this.isUnlocked = true;
        }
    }

    /**
     * Unlock audio for mobile browsers
     * Must be called from a user gesture (click/touch) event handler
     * This plays a silent sound to unlock the audio context
     */
    unlockAudio() {
        if (this.isUnlocked) return Promise.resolve(true);

        this.initAudioContext();

        // Create and play a silent oscillator to unlock audio
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        // Set gain to 0 (silent)
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.001);

        // Resume context if suspended
        return this.audioContext.resume().then(() => {
            this.isUnlocked = true;
            console.log('Audio unlocked for mobile');
            return true;
        }).catch(err => {
            console.warn('Failed to unlock audio:', err);
            return false;
        });
    }

    /**
     * Check if audio is unlocked and ready for playback
     */
    isAudioReady() {
        return this.enabled && this.isUnlocked && this.audioContext?.state === 'running';
    }

    // Check if speech synthesis is supported
    isSupported() {
        return 'speechSynthesis' in window;
    }

    // Update enabled state
    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.cancel();
            this.stopAmbient();
        }
    }

    // Cancel current speech
    cancel() {
        if (this.synth) {
            this.synth.cancel();
        }
    }

    // Speak text in current language (for announcements only)
    speak(text) {
        if (!this.enabled || !this.isSupported() || !text) {
            return;
        }

        // Cancel any ongoing speech
        this.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const currentLang = strings.getLanguage();
        utterance.lang = languageMap[currentLang] || 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        this.synth.speak(utterance);
    }

    // Play a directional tone using Web Audio API
    playTone(action) {
        if (!this.enabled) return;

        const toneConfig = directionTones[action];
        if (!toneConfig) return; // No sound for center

        this.initAudioContext();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const panNode = this.audioContext.createStereoPanner();

        // Configure oscillator
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(toneConfig.freq, this.audioContext.currentTime);

        // Configure panning (left/right positioning)
        panNode.pan.setValueAtTime(toneConfig.pan, this.audioContext.currentTime);

        // Configure envelope (quick attack, short sustain, smooth release)
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02);  // Quick attack
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);   // Sustain
        gainNode.gain.linearRampToValueAtTime(0, now + 0.25);    // Release

        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(this.audioContext.destination);

        // Play
        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Play a pleasant chime for transitions
    playChime(isStart = true) {
        if (!this.enabled) return;

        this.initAudioContext();

        const baseFreq = isStart ? 523 : 659; // C5 or E5
        const frequencies = isStart ? [baseFreq, baseFreq * 1.25, baseFreq * 1.5] : [baseFreq * 1.5, baseFreq * 1.25, baseFreq];

        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

            const now = this.audioContext.currentTime;
            const delay = index * 0.08;
            gainNode.gain.setValueAtTime(0, now + delay);
            gainNode.gain.linearRampToValueAtTime(0.15, now + delay + 0.02);
            gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.4);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start(now + delay);
            oscillator.stop(now + delay + 0.5);
        });
    }

    // Play success sound for completion
    playSuccess() {
        if (!this.enabled) return;

        this.initAudioContext();

        // Pleasant major chord arpeggio
        const frequencies = [523, 659, 784, 1047]; // C5, E5, G5, C6

        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

            const now = this.audioContext.currentTime;
            const delay = index * 0.1;
            gainNode.gain.setValueAtTime(0, now + delay);
            gainNode.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
            gainNode.gain.linearRampToValueAtTime(0.1, now + delay + 0.3);
            gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.6);

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.start(now + delay);
            oscillator.stop(now + delay + 0.7);
        });
    }

    // Start ambient background sound (gentle brown noise - sounds like soft rain/wind)
    startAmbient() {
        if (!this.enabled || this.isAmbientPlaying) return;

        this.initAudioContext();
        this.isAmbientPlaying = true;

        // Create brown noise using a buffer (sounds like soft rain/distant waterfall)
        const bufferSize = 2 * this.audioContext.sampleRate; // 2 seconds of audio
        const noiseBuffer = this.audioContext.createBuffer(2, bufferSize, this.audioContext.sampleRate);

        // Generate brown noise for each channel
        for (let channel = 0; channel < 2; channel++) {
            const output = noiseBuffer.getChannelData(channel);
            let lastOut = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                // Brown noise: integrate white noise (low-pass filter effect)
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                // Normalize to prevent clipping
                output[i] *= 3.5;
            }
        }

        // Create buffer source for looping
        this.ambientSource = this.audioContext.createBufferSource();
        this.ambientSource.buffer = noiseBuffer;
        this.ambientSource.loop = true;

        // Create gain node for volume control and fade in/out
        this.ambientGain = this.audioContext.createGain();
        this.ambientGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.ambientGain.gain.linearRampToValueAtTime(0.06, this.audioContext.currentTime + 2); // Very gentle volume

        // Optional: Add a low-pass filter to make it even softer
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.audioContext.currentTime); // Cut high frequencies

        // Connect nodes
        this.ambientSource.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.audioContext.destination);

        // Start playback
        this.ambientSource.start();
    }

    // Stop ambient background sound
    stopAmbient() {
        if (!this.isAmbientPlaying) return;

        if (this.ambientGain) {
            const now = this.audioContext.currentTime;
            this.ambientGain.gain.linearRampToValueAtTime(0, now + 1);

            // Stop source after fade out
            setTimeout(() => {
                if (this.ambientSource) {
                    try { this.ambientSource.stop(); } catch (e) { }
                    this.ambientSource = null;
                }
                this.ambientGain = null;
            }, 1500);
        }

        this.isAmbientPlaying = false;
    }

    // Play direction sound (tone only, no voice)
    playDirection(action) {
        // Skip center - no audio needed
        if (action === ACTION_CENTER) {
            return;
        }

        // Skip if same as last action
        if (action === this.lastAction) {
            return;
        }
        this.lastAction = action;

        this.playTone(action);
    }

    // Speak exercise name (voice announcement)
    speakExerciseName(name) {
        if (name) {
            this.playChime(true);
            // Small delay so chime plays first
            setTimeout(() => this.speak(name), 200);
        }
    }

    // Speak completion message
    speakCompletion() {
        this.playSuccess();
        setTimeout(() => this.speak(strings.finishedForToday), 500);
    }

    // Speak blink instruction
    speakBlink() {
        this.speak(strings.blink);
    }

    // Speak get ready message
    speakGetReady() {
        this.playChime(true);
        setTimeout(() => this.speak(strings.getReady), 200);
    }

    // Play countdown beep
    playCountdownBeep(number) {
        if (!this.enabled) return;

        this.initAudioContext();

        // Higher pitch for lower numbers (urgency)
        const freq = 440 + (5 - Math.min(number, 5)) * 50;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.15);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    // Reset last action (useful when starting new exercise)
    resetLastAction() {
        this.lastAction = null;
    }
}

// Singleton instance
const audioGuide = new AudioGuide();

export default audioGuide;
