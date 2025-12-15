/**
 * 整合所有頁面的邏輯
 * 使用模組化設計，根據頁面類型載入對應功能
 */

// ==========================================
// 課程頁面模組
// ==========================================
const CoursePage = {
    coursesData: [],

    async init() {
        // 載入資料
        this.coursesData = await DataLoader.loadCourses();
        this.renderCourses(this.coursesData);
        this.attachEventListeners();
    },

    renderCourses(courses) {
        const courseList = document.getElementById('courseList');
        if (!courseList) return;

        if (courses.length === 0) {
            courseList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">沒有找到符合條件的課程</p>';
            return;
        }

        courseList.innerHTML = courses.map(course => `
            <article class="course-card">
                <div class="course-thumbnail" style="background: linear-gradient(135deg, ${Utils.getGradientColors(course.department)});">
                    ${course.icon}
                </div>
                <div class="course-info">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-code">課程代碼: ${course.code}</p>
                    <p class="course-details">開課系(所): ${course.class} ${course.startDate} ~ 課程結束日期: ${course.endDate}</p>
                    <div class="course-meta">
                        <span>📁 總資料夾: ${Utils.getTypeText(course.type)}</span>
                        <span>📊 學分數: ${course.credits}</span>
                        <span>🎯 完課判定: 👤👤</span>
                    </div>
                </div>
                <div class="course-actions">
                    <span class="course-number">${course.code.substring(0, 4)}</span>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="CoursePage.showCourseOverview(${course.id})">課程概述</button>
                        <button class="action-btn" onclick="CoursePage.showMoreOptions(${course.id})">更多</button>
                    </div>
                </div>
            </article>
        `).join('');
    },

    filterCourses() {
        const searchInput = document.getElementById('searchInput');
        const yearFilter = document.getElementById('yearFilter');
        const semesterFilter = document.getElementById('semesterFilter');
        const typeFilter = document.getElementById('typeFilter');
        const departmentFilter = document.getElementById('departmentFilter');
        const gradeFilter = document.getElementById('gradeFilter');
        const progressFilter = document.getElementById('progressFilter');

        const searchTerm = searchInput.value.toLowerCase();
        const year = yearFilter.value;
        const semester = semesterFilter.value;
        const type = typeFilter.value;
        const department = departmentFilter.value;
        const grade = gradeFilter.value;
        const progress = progressFilter.value;

        const filtered = this.coursesData.filter(course => {
            const matchSearch = !searchTerm ||
                course.title.toLowerCase().includes(searchTerm) ||
                course.code.toLowerCase().includes(searchTerm);

            const matchYear = !year || course.year === year;
            const matchSemester = !semester || course.semester === semester;
            const matchType = !type || course.type === type;
            const matchDepartment = !department || course.department === department;
            const matchGrade = !grade || course.grade === grade;
            const matchProgress = !progress || course.progress === progress;

            return matchSearch && matchYear && matchSemester && matchType &&
                matchDepartment && matchGrade && matchProgress;
        });

        this.renderCourses(filtered);
    },

    attachEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');

        searchInput?.addEventListener('input', () => this.filterCourses());
        searchBtn?.addEventListener('click', () => this.filterCourses());
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.filterCourses();
        });

        ['yearFilter', 'semesterFilter', 'typeFilter', 'departmentFilter', 'gradeFilter', 'progressFilter']
            .forEach(id => {
                document.getElementById(id)?.addEventListener('change', () => this.filterCourses());
            });
    },

    showCourseOverview(courseId) {
        const course = this.coursesData.find(c => c.id === courseId);
        if (course) {
            alert(`課程概述\n\n課程名稱: ${course.title}\n課程代碼: ${course.code}\n學分數: ${course.credits}\n課程性質: ${Utils.getTypeText(course.type)}\n\n這是一個示範彈窗，實際應用中可以使用模態框顯示更詳細的課程資訊。`);
        }
    },

    showMoreOptions(courseId) {
        const course = this.coursesData.find(c => c.id === courseId);
        if (course) {
            const options = ['查看課程大綱', '查看課程公告', '查看課程教材', '查看成績', '退選課程'];
            alert(`更多選項 - ${course.title}\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n這是一個示範彈窗，實際應用中可以使用下拉選單或模態框。`);
        }
    }
};

// ==========================================
// 成績頁面模組
// ==========================================
const GradesPage = {
    gradesData: [],

    async init() {
        // 載入資料
        this.gradesData = await DataLoader.loadGrades();
        this.renderGrades(this.gradesData);
        this.attachEventListeners();
    },

    renderGrades(grades) {
        const container = document.getElementById('gradesContainer');
        if (!container) return;

        if (grades.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">沒有找到符合條件的成績記錄</div>';
            return;
        }

        const grouped = this.groupByYearSemester(grades);
        container.innerHTML = Object.keys(grouped)
            .sort((a, b) => b.localeCompare(a))
            .map(key => {
                const [year, semester] = key.split('-');
                const semesterGrades = grouped[key];
                const gpa = this.calculateGPA(semesterGrades);

                return `
                    <div class="semester-block">
                        <div class="semester-header">
                            <h3 class="semester-title">${year} 學年 第 ${semester} 學期</h3>
                            <div class="semester-gpa">
                                <span>學期 GPA:</span>
                                <span class="gpa-badge">${gpa}</span>
                            </div>
                        </div>
                        <div class="grades-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>課程名稱</th>
                                        <th>課程代碼</th>
                                        <th>性質</th>
                                        <th>學分</th>
                                        <th>授課教師</th>
                                        <th>排名</th>
                                        <th>成績</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${semesterGrades.map(grade => `
                                        <tr>
                                            <td class="course-name-cell">${grade.courseName}</td>
                                            <td><span class="course-code-text">${grade.courseCode}</span></td>
                                            <td><span class="type-badge type-${grade.type}">${Utils.getTypeText(grade.type)}</span></td>
                                            <td>${grade.credits}</td>
                                            <td>${grade.teacher}</td>
                                            <td>${grade.rank}</td>
                                            <td>
                                                <div class="grade-score ${this.getGradeClass(grade.score)}">
                                                    ${grade.score}
                                                    ${this.getGradeEmoji(grade.score)}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }).join('');
    },

    groupByYearSemester(grades) {
        return grades.reduce((groups, grade) => {
            const key = `${grade.year}-${grade.semester}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(grade);
            return groups;
        }, {});
    },

    calculateGPA(grades) {
        if (grades.length === 0) return '0.00';
        let totalPoints = 0, totalCredits = 0;
        grades.forEach(grade => {
            const gradePoint = this.scoreToGradePoint(grade.score);
            totalPoints += gradePoint * grade.credits;
            totalCredits += grade.credits;
        });
        return (totalPoints / totalCredits).toFixed(2);
    },

    scoreToGradePoint(score) {
        if (score >= 90) return 4.3;
        if (score >= 85) return 4.0;
        if (score >= 80) return 3.7;
        if (score >= 77) return 3.3;
        if (score >= 73) return 3.0;
        if (score >= 70) return 2.7;
        if (score >= 67) return 2.3;
        if (score >= 63) return 2.0;
        if (score >= 60) return 1.7;
        return 0.0;
    },

    getGradeClass(score) {
        if (score >= 90) return 'grade-excellent';
        if (score >= 85) return 'grade-good';
        if (score >= 80) return 'grade-average';
        if (score >= 70) return 'grade-pass';
        return 'grade-fail';
    },

    getGradeEmoji(score) {
        if (score >= 90) return '🌟';
        if (score >= 85) return '⭐';
        if (score >= 80) return '✨';
        if (score >= 70) return '👍';
        return '📝';
    },

    filterGrades() {
        const year = document.getElementById('yearFilter')?.value;
        const semester = document.getElementById('semesterFilter')?.value;
        const type = document.getElementById('typeFilter')?.value;

        const filtered = this.gradesData.filter(grade => {
            const matchYear = !year || grade.year === year;
            const matchSemester = !semester || grade.semester === semester;
            const matchType = !type || grade.type === type;
            return matchYear && matchSemester && matchType;
        });

        this.renderGrades(filtered);
    },

    attachEventListeners() {
        ['yearFilter', 'semesterFilter', 'typeFilter'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => this.filterGrades());
        });

        document.querySelector('.export-btn')?.addEventListener('click', () => {
            alert('📥 匯出成績單\n\n此功能為示範，實際應用中會生成 PDF 或 Excel 檔案。');
        });
    }
};

// ==========================================
// 行事曆頁面模組
// ==========================================
const CalendarPage = {
    eventsData: [],
    currentDate: new Date(),
    currentView: 'month',

    async init() {
        // 載入資料
        this.eventsData = await DataLoader.loadEvents();
        this.renderCalendar();
        this.renderUpcomingEvents();
        this.attachEventListeners();
    },

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        document.getElementById('currentMonth').textContent = `${year} 年 ${month + 1} 月`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);

        const firstDayWeek = firstDay.getDay();
        const lastDate = lastDay.getDate();
        const prevLastDate = prevLastDay.getDate();

        const grid = document.querySelector('.calendar-grid');
        const weekdayHeaders = Array.from(grid.querySelectorAll('.weekday-header'));
        grid.innerHTML = '';
        weekdayHeaders.forEach(header => grid.appendChild(header));

        // 上個月日期
        for (let i = firstDayWeek - 1; i >= 0; i--) {
            const day = prevLastDate - i;
            grid.appendChild(this.createDayElement(day, true, new Date(year, month - 1, day)));
        }

        // 當月日期
        for (let day = 1; day <= lastDate; day++) {
            const date = new Date(year, month, day);
            const isToday = Utils.isSameDay(date, new Date());
            grid.appendChild(this.createDayElement(day, false, date, isToday));
        }

        // 下個月日期
        const remainingDays = 42 - (firstDayWeek + lastDate);
        for (let day = 1; day <= remainingDays; day++) {
            grid.appendChild(this.createDayElement(day, true, new Date(year, month + 1, day)));
        }
    },

    createDayElement(day, isOtherMonth, date, isToday = false) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        if (isOtherMonth) dayEl.classList.add('other-month');
        if (isToday) dayEl.classList.add('today');

        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayEl.appendChild(dayNumber);

        if (!isOtherMonth) {
            const dayEvents = this.getEventsForDate(date);
            if (dayEvents.length > 0) {
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'day-events';

                dayEvents.slice(0, 3).forEach(event => {
                    const eventDot = document.createElement('div');
                    eventDot.className = `event-dot event-${event.type}`;
                    eventDot.textContent = event.title;
                    eventDot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showEventModal(event);
                    });
                    eventsContainer.appendChild(eventDot);
                });

                if (dayEvents.length > 3) {
                    const moreDot = document.createElement('div');
                    moreDot.className = 'event-dot';
                    moreDot.textContent = `+${dayEvents.length - 3} 更多`;
                    moreDot.style.backgroundColor = '#f0f0f0';
                    moreDot.style.color = '#666';
                    eventsContainer.appendChild(moreDot);
                }

                dayEl.appendChild(eventsContainer);
            }
        }

        return dayEl;
    },

    getEventsForDate(date) {
        return this.eventsData.filter(event => {
            const eventDate = new Date(event.date);
            return Utils.isSameDay(eventDate, date);
        });
    },

    renderUpcomingEvents() {
        const container = document.getElementById('upcomingEvents');
        if (!container) return;

        const today = new Date();
        const upcoming = this.eventsData
            .filter(event => new Date(event.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6);

        container.innerHTML = upcoming.map(event => {
            const daysLeft = Math.ceil((new Date(event.date) - today) / (1000 * 60 * 60 * 24));
            const urgencyClass = daysLeft <= 2 ? 'urgent' : daysLeft <= 5 ? 'soon' : 'normal';

            return `
                <div class="upcoming-card" onclick='CalendarPage.showEventModal(${JSON.stringify(event)})' style="border-left-color: ${Utils.getGradientColors(event.type)}">
                    <div class="upcoming-header">
                        <div class="upcoming-title">${event.title}</div>
                        <div class="upcoming-time">${event.time}</div>
                    </div>
                    <div class="upcoming-course">📚 ${event.course}</div>
                    <div class="upcoming-footer">
                        <span class="event-type-badge type-${event.type}">${Utils.getTypeText(event.type)}</span>
                        <span class="days-left ${urgencyClass}">${daysLeft} 天後</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    showEventModal(event) {
        if (typeof event === 'string') event = JSON.parse(event);

        const content = `
            <div class="modal-info-row">
                <div class="modal-info-label">課程</div>
                <div class="modal-info-value">${event.course}</div>
            </div>
            <div class="modal-info-row">
                <div class="modal-info-label">類型</div>
                <div class="modal-info-value">
                    <span class="event-type-badge type-${event.type}">${Utils.getTypeText(event.type)}</span>
                </div>
            </div>
            <div class="modal-info-row">
                <div class="modal-info-label">日期</div>
                <div class="modal-info-value">${Utils.formatDate(event.date)}</div>
            </div>
            <div class="modal-info-row">
                <div class="modal-info-label">時間</div>
                <div class="modal-info-value">${event.time}</div>
            </div>
            ${event.location ? `
            <div class="modal-info-row">
                <div class="modal-info-label">地點</div>
                <div class="modal-info-value">${event.location}</div>
            </div>
            ` : ''}
            <div class="modal-info-row">
                <div class="modal-info-label">說明</div>
                <div class="modal-info-value">${event.description}</div>
            </div>
        `;

        UI.showModal(event.title, content);
    },

    attachEventListeners() {
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('todayBtn')?.addEventListener('click', () => {
            this.currentDate = new Date();
            this.renderCalendar();
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const view = btn.dataset.view;
                this.currentView = view;

                const calendarView = document.getElementById('calendarView');
                const listView = document.getElementById('listView');

                if (view === 'month') {
                    calendarView.style.display = 'block';
                    listView.style.display = 'none';
                } else if (view === 'list') {
                    calendarView.style.display = 'none';
                    listView.style.display = 'block';
                    this.renderListView();
                }
            });
        });
    },

    renderListView() {
        const eventsList = document.getElementById('eventsList');
        if (!eventsList) return;

        const sortedEvents = [...this.eventsData].sort((a, b) => new Date(a.date) - new Date(b.date));

        eventsList.innerHTML = sortedEvents.map(event => {
            const eventDate = new Date(event.date);
            const month = eventDate.toLocaleDateString('zh-TW', { month: 'short' });
            const day = eventDate.getDate();

            return `
                <div class="event-item" onclick='CalendarPage.showEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})'>
                    <div class="event-date-badge">
                        <div class="event-month">${month}</div>
                        <div class="event-day">${day}</div>
                    </div>
                    <div class="event-details">
                        <div class="event-title">${event.title}</div>
                        <div class="event-meta">
                            <span>📚 ${event.course}</span>
                            <span>⏰ ${event.time}</span>
                            ${event.location ? `<span>📍 ${event.location}</span>` : ''}
                        </div>
                    </div>
                    <span class="event-type-badge type-${event.type}">${Utils.getTypeText(event.type)}</span>
                </div>
            `;
        }).join('');
    }
};

// ==========================================
// 頁面初始化
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    const page = document.body.dataset.page;

    try {
        switch (page) {
            case 'courses':
                await CoursePage.init();
                break;
            case 'grades':
                await GradesPage.init();
                break;
            case 'calendar':
                await CalendarPage.init();
                break;
        }
    } catch (error) {
        console.error('[App] 頁面初始化失敗:', error);
    }
});
