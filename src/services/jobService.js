const API_BASE_URL = 'https://ejiwirjgosdyeulhcejt.supabase.co/functions/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqaXdpcmpnb3NkeWV1bGhjZWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjE3MjMsImV4cCI6MjA4MDU5NzcyM30.pBV9jWivQxFI3gOLnIIAbprn-XJ3FUqYSndoQpADLto';

export const jobService = {
  /**
   * Search for jobs with optional filters
   * @param {Object} params - Search parameters
   * @param {string} params.q - Search query
   * @param {number} params.limit - Number of results to return
   * @param {number} params.offset - Pagination offset
   * @returns {Promise<Array>} Array of job listings
   */
  async searchJobs(params = {}) {
    const { q = '', limit = 20, offset = 0 } = params;
    
    try {
      const queryParams = new URLSearchParams({
        q,
        limit: limit.toString(),
        offset: offset.toString()
      });

      const response = await fetch(`${API_BASE_URL}/jobs/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  /**
   * Get a single job by ID
   * @param {string} id - Job ID
   * @returns {Promise<Object>} Job details
   */
  async getJobById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  /**
   * Get featured jobs
   * @param {number} limit - Number of featured jobs to return
   * @returns {Promise<Array>} Array of featured job listings
   */
  async getFeaturedJobs(limit = 8) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/search?q=&limit=${limit}&offset=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Filter for featured jobs if needed, or return all
      return data.filter(job => job.is_featured) || data.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
      throw error;
    }
  }
};
