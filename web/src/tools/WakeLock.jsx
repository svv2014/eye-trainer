/**
 * WakeLock utility - Prevents screen from turning off during exercises
 * Uses the Screen Wake Lock API (supported in modern mobile browsers)
 */

class WakeLockManager {
    constructor() {
        this.wakeLock = null;
        this.isSupported = 'wakeLock' in navigator;
    }

    /**
     * Request a wake lock to keep the screen on
     * @returns {Promise<boolean>} Whether the wake lock was acquired
     */
    async acquire() {
        if (!this.isSupported) {
            console.log('Wake Lock API not supported');
            return false;
        }

        try {
            this.wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake lock acquired');

            // Re-acquire wake lock when page becomes visible again
            this.wakeLock.addEventListener('release', () => {
                console.log('Wake lock released');
            });

            // Handle visibility change - re-acquire lock when tab becomes visible
            document.addEventListener('visibilitychange', this.handleVisibilityChange);

            return true;
        } catch (err) {
            console.warn('Failed to acquire wake lock:', err.message);
            return false;
        }
    }

    /**
     * Handle visibility change - re-acquire wake lock when page becomes visible
     */
    handleVisibilityChange = async () => {
        if (this.wakeLock !== null && document.visibilityState === 'visible') {
            await this.acquire();
        }
    };

    /**
     * Release the wake lock
     */
    async release() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);

        if (this.wakeLock) {
            try {
                await this.wakeLock.release();
                this.wakeLock = null;
                console.log('Wake lock manually released');
            } catch (err) {
                console.warn('Error releasing wake lock:', err.message);
            }
        }
    }

    /**
     * Check if wake lock is currently active
     * @returns {boolean}
     */
    isActive() {
        return this.wakeLock !== null && !this.wakeLock.released;
    }
}

// Singleton instance
const wakeLockManager = new WakeLockManager();

export default wakeLockManager;
