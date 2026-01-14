import React from 'react';
import '../css/common.css';
import './Dashboard.css';
import {strings} from "../languages/localizationStrings";
import {Cookies} from 'react-cookie';
import ProgressTracking from '../tools/progressTracking';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let language = strings.getLanguage();

        const stats = ProgressTracking.getStats();

        this.state = {
            language: language,
            stats: stats
        }
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage(lang) {
        strings.setLanguage(lang);
        this.cookies.set('lang', lang, {path: '/'});
        this.setState({
            language: lang
        });
    }

    componentDidMount() {
        // Refresh stats when component mounts
        const stats = ProgressTracking.getStats();
        this.setState({ stats });
    }

    renderCalendar() {
        const { calendar } = this.state.stats;

        // Group calendar data by weeks
        const weeks = [];
        let currentWeek = [];

        // Add empty cells for alignment (start from Monday)
        const firstDayOfWeek = ProgressTracking.getDayOfWeek(calendar[0].date);
        const emptyDays = (firstDayOfWeek + 6) % 7; // Convert Sunday=0 to Monday=0

        for (let i = 0; i < emptyDays; i++) {
            currentWeek.push(null);
        }

        calendar.forEach((day, index) => {
            currentWeek.push(day);

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        // Add the last partial week
        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            weeks.push(currentWeek);
        }

        return (
            <div className="calendar-grid">
                <div className="calendar-legend">
                    <span className="legend-label">{strings.lesActivity}</span>
                    <div className="legend-item level-0"></div>
                    <div className="legend-item level-1"></div>
                    <div className="legend-item level-2"></div>
                    <div className="legend-item level-3"></div>
                    <div className="legend-item level-4"></div>
                    <span className="legend-label">{strings.moreActivity}</span>
                </div>
                <div className="calendar-weeks">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="calendar-week">
                            {week.map((day, dayIndex) => (
                                day ? (
                                    <div
                                        key={dayIndex}
                                        className={`calendar-day level-${day.level}`}
                                        title={`${day.date}: ${day.count} ${strings.selfTestTitle}${day.count !== 1 ? 's' : ''} (${day.points} ${strings.points})`}
                                    >
                                    </div>
                                ) : (
                                    <div key={dayIndex} className="calendar-day empty"></div>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderBadges() {
        const { badges } = this.state.stats;

        if (badges.length === 0) {
            return <p className="textGray no-badges">{strings.noBadges}</p>;
        }

        return (
            <div className="badges-grid">
                {badges.map((badge, index) => (
                    <div key={index} className="badge-item" title={badge.name}>
                        <div className="badge-icon">{badge.icon}</div>
                        <div className="badge-name">{badge.name}</div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        const { stats } = this.state;
        const hasCompletedToday = stats.lastCompletedDate === ProgressTracking.getTodayDate();

        return (
            <div className="App dashboard-container">
                <h1 className={"pageTitle"}>{strings.dashboard}</h1>

                {/* Stats Summary Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">{stats.currentStreak}</div>
                        <div className="stat-label">{strings.currentStreak}</div>
                        <div className="stat-sublabel">{strings.days}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-value">{stats.longestStreak}</div>
                        <div className="stat-label">{strings.longestStreak}</div>
                        <div className="stat-sublabel">{strings.days}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">💪</div>
                        <div className="stat-value">{stats.totalSessions}</div>
                        <div className="stat-label">{strings.totalSessions}</div>
                        <div className="stat-sublabel">{strings.completedDays}: {stats.completedDays}</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-value">{stats.totalPoints}</div>
                        <div className="stat-label">{strings.totalPoints}</div>
                        <div className="stat-sublabel">{stats.badges.length} {strings.badges}</div>
                    </div>
                </div>

                {/* Activity Calendar */}
                <div className="section">
                    <h2>{strings.activityCalendar}</h2>
                    {this.renderCalendar()}
                </div>

                {/* Badges Section */}
                <div className="section">
                    <h2>{strings.badges}</h2>
                    {this.renderBadges()}
                </div>

                {/* Call to Action */}
                <div className="cta-section">
                    <a href="/welcome" className="cta-button">
                        {hasCompletedToday ? strings.continueTraining : strings.startTraining}
                    </a>
                </div>

                {/* Quebec Badge */}
                <div className={"quebec-badge"}>
                    <p className={"textGray"}><small>{strings.builtInQuebec}</small></p>
                    <p className={"textGray"}><small><i>{strings.peopleDriven}</i></small></p>
                </div>
            </div>
        );
    }
}

export default Dashboard;
