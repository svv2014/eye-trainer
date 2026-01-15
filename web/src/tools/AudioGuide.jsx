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
    'fr': 'fr-FR',
    'ru': 'ru-RU'
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
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
    }

    // Initialize Web Audio API context (must be called after user interaction)
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
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

    // Start ambient background music (gentle drone)
    startAmbient() {
        if (!this.enabled || this.isAmbientPlaying) return;

        this.initAudioContext();
        this.isAmbientPlaying = true;

        // Create a gentle ambient drone with multiple oscillators
        this.ambientGain = this.audioContext.createGain();
        this.ambientGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.ambientGain.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 2);
        this.ambientGain.connect(this.audioContext.destination);

        // Base frequencies for ambient sound (C major with slight detuning for warmth)
        const ambientFreqs = [65.41, 98, 130.81, 196]; // C2, G2, C3, G3

        ambientFreqs.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            const oscGain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            // Add slight pitch variation for organic feel
            osc.frequency.setValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.01), this.audioContext.currentTime);

            oscGain.gain.setValueAtTime(0.3 - index * 0.05, this.audioContext.currentTime);

            osc.connect(oscGain);
            oscGain.connect(this.ambientGain);
            osc.start();

            this.ambientOscillators.push({ osc, gain: oscGain });
        });
    }

    // Stop ambient background music
    stopAmbient() {
        if (!this.isAmbientPlaying) return;

        if (this.ambientGain) {
            const now = this.audioContext.currentTime;
            this.ambientGain.gain.linearRampToValueAtTime(0, now + 1);

            // Stop oscillators after fade out
            setTimeout(() => {
                this.ambientOscillators.forEach(({ osc }) => {
                    try { osc.stop(); } catch (e) { }
                });
                this.ambientOscillators = [];
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
