import axios from 'axios';

const API_URL = 'http://localhost:3000/activities/';

class ActivityService {
  async getWeeklyActivities() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async addComment(activityId, comment) {
    const response = await axios.post(`${API_URL}${activityId}/comment`, { comment });
    return response.data;
  }
}

export default new ActivityService();
