// Progress Tracking Utilities
// Manages user progress, streaks, and statistics using localStorage

const STORAGE_KEY = 'eyeTrainer_progress';

export const ProgressTracking = {
    // Initialize or get existing progress data
    getProgress() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return this.initializeProgress();
    },

    initializeProgress() {
        const initialData = {
            completedDays: {}, // { "2026-01-14": { count: 1, difficulty: "intermediate", points: 50 } }
            currentStreak: 0,
            longestStreak: 0,
            totalSessions: 0,
            totalPoints: 0,
            badges: [],
            lastCompletedDate: null,
            firstSessionDate: null,
        };
        this.saveProgress(initialData);
        return initialData;
    },

    saveProgress(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    // Record a completed exercise session
    recordSession(difficulty) {
        const progress = this.getProgress();
        const today = this.getTodayDate();

        // Initialize first session date
        if (!progress.firstSessionDate) {
            progress.firstSessionDate = today;
        }

        // Calculate points based on difficulty
        const points = this.calculatePoints(difficulty);

        // Update or create today's entry
        if (!progress.completedDays[today]) {
            progress.completedDays[today] = {
                count: 1,
                difficulty: difficulty,
                points: points,
                timestamp: new Date().toISOString()
            };
        } else {
            progress.completedDays[today].count += 1;
            progress.completedDays[today].points += points;
        }

        // Update totals
        progress.totalSessions += 1;
        progress.totalPoints += points;
        progress.lastCompletedDate = today;

        // Update streaks
        this.updateStreaks(progress);

        // Check for new badges
        this.checkAndAwardBadges(progress);

        this.saveProgress(progress);
        return progress;
    },

    calculatePoints(difficulty) {
        const pointsMap = {
            'beginner': 10,
            'intermediate': 25,
            'advanced': 50,
            'advanced2': 100
        };
        return pointsMap[difficulty] || 10;
    },

    updateStreaks(progress) {
        const today = this.getTodayDate();
        const yesterday = this.getDateDaysAgo(1);

        // If completed today or yesterday, continue or start streak
        if (progress.completedDays[yesterday] || progress.completedDays[today]) {
            // Calculate current streak by counting backwards
            let streak = 0;
            let checkDate = today;

            while (progress.completedDays[checkDate]) {
                streak++;
                checkDate = this.getDateDaysAgo(streak);
            }

            progress.currentStreak = streak;

            // Update longest streak
            if (progress.currentStreak > progress.longestStreak) {
                progress.longestStreak = progress.currentStreak;
            }
        } else {
            // Streak broken
            progress.currentStreak = 1;
        }
    },

    checkAndAwardBadges(progress) {
        const badges = [];

        // First Session badge
        if (progress.totalSessions === 1) {
            badges.push({ id: 'first_session', name: 'First Steps', icon: '🎯', date: new Date().toISOString() });
        }

        // Streak badges
        if (progress.currentStreak === 3 && !this.hasBadge(progress, '3_day_streak')) {
            badges.push({ id: '3_day_streak', name: '3-Day Streak', icon: '🔥', date: new Date().toISOString() });
        }
        if (progress.currentStreak === 7 && !this.hasBadge(progress, '7_day_streak')) {
            badges.push({ id: '7_day_streak', name: 'Week Warrior', icon: '⭐', date: new Date().toISOString() });
        }
        if (progress.currentStreak === 30 && !this.hasBadge(progress, '30_day_streak')) {
            badges.push({ id: '30_day_streak', name: 'Monthly Master', icon: '👑', date: new Date().toISOString() });
        }

        // Session count badges
        if (progress.totalSessions === 10 && !this.hasBadge(progress, '10_sessions')) {
            badges.push({ id: '10_sessions', name: 'Dedicated', icon: '💪', date: new Date().toISOString() });
        }
        if (progress.totalSessions === 50 && !this.hasBadge(progress, '50_sessions')) {
            badges.push({ id: '50_sessions', name: 'Eye Champion', icon: '🏆', date: new Date().toISOString() });
        }
        if (progress.totalSessions === 100 && !this.hasBadge(progress, '100_sessions')) {
            badges.push({ id: '100_sessions', name: 'Vision Legend', icon: '💎', date: new Date().toISOString() });
        }

        // Add new badges to progress
        if (badges.length > 0) {
            progress.badges = [...progress.badges, ...badges];
        }

        return badges;
    },

    hasBadge(progress, badgeId) {
        return progress.badges.some(badge => badge.id === badgeId);
    },

    // Get calendar data for visualization (last 90 days)
    getCalendarData(days = 90) {
        const progress = this.getProgress();
        const calendar = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = this.getDateDaysAgo(i);
            const dayData = progress.completedDays[date];

            calendar.push({
                date: date,
                completed: !!dayData,
                count: dayData ? dayData.count : 0,
                points: dayData ? dayData.points : 0,
                level: this.getActivityLevel(dayData)
            });
        }

        return calendar;
    },

    getActivityLevel(dayData) {
        if (!dayData) return 0;
        if (dayData.count >= 3) return 4;
        if (dayData.count >= 2) return 3;
        if (dayData.count >= 1) return 2;
        return 1;
    },

    // Get statistics summary
    getStats() {
        const progress = this.getProgress();
        const calendar = this.getCalendarData(90);
        const completedDaysCount = Object.keys(progress.completedDays).length;

        return {
            currentStreak: progress.currentStreak,
            longestStreak: progress.longestStreak,
            totalSessions: progress.totalSessions,
            totalPoints: progress.totalPoints,
            completedDays: completedDaysCount,
            badges: progress.badges,
            lastCompletedDate: progress.lastCompletedDate,
            firstSessionDate: progress.firstSessionDate,
            calendar: calendar
        };
    },

    // Utility functions
    getTodayDate() {
        const now = new Date();
        return this.formatDate(now);
    },

    getDateDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return this.formatDate(date);
    },

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // Get day of week (0 = Sunday, 6 = Saturday)
    getDayOfWeek(dateString) {
        return new Date(dateString).getDay();
    },

    // Reset all progress (for testing or user request)
    resetProgress() {
        localStorage.removeItem(STORAGE_KEY);
        return this.initializeProgress();
    }
};

export default ProgressTracking;
