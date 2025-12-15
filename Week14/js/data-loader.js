/**
 * 資料載入工具
 * 負責從 JSON 檔案載入資料並提供快取機制
 */
const DataLoader = {
    cache: {},

    /**
     * 載入 JSON 資料
     * @param {string} filename - JSON 檔案名稱
     * @returns {Promise<any>} 解析後的資料
     */
    async load(filename) {
        // 檢查快取
        if (this.cache[filename]) {
            console.log(`[DataLoader] 從快取載入: ${filename}`);
            return this.cache[filename];
        }

        try {
            console.log(`[DataLoader] 載入檔案: ${filename}`);
            const response = await fetch(`data/${filename}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // 存入快取
            this.cache[filename] = data;
            console.log(`[DataLoader] 成功載入並快取: ${filename}`);

            return data;
        } catch (error) {
            console.error(`[DataLoader] 載入失敗 ${filename}:`, error);

            // 返回空資料結構避免程式崩潰
            return this.getEmptyData(filename);
        }
    },

    /**
     * 取得空資料結構（錯誤時使用）
     * @param {string} filename - 檔案名稱
     * @returns {object} 空資料結構
     */
    getEmptyData(filename) {
        const emptyStructures = {
            'courses.json': { courses: [] },
            'grades.json': { grades: [] },
            'events.json': { events: [] }
        };
        return emptyStructures[filename] || {};
    },

    /**
     * 載入課程資料
     * @returns {Promise<Array>} 課程陣列
     */
    async loadCourses() {
        const data = await this.load('courses.json');
        return data?.courses || [];
    },

    /**
     * 載入成績資料
     * @returns {Promise<Array>} 成績陣列
     */
    async loadGrades() {
        const data = await this.load('grades.json');
        return data?.grades || [];
    },

    /**
     * 載入事件資料
     * @returns {Promise<Array>} 事件陣列
     */
    async loadEvents() {
        const data = await this.load('events.json');
        return data?.events || [];
    },

    /**
     * 清除快取
     */
    clearCache() {
        this.cache = {};
        console.log('[DataLoader] 快取已清除');
    },

    /**
     * 重新載入指定檔案（清除快取後重新載入）
     * @param {string} filename - 檔案名稱
     * @returns {Promise<any>} 解析後的資料
     */
    async reload(filename) {
        delete this.cache[filename];
        return await this.load(filename);
    }
};
