import React, { useState, useEffect } from 'react';
import ActivityService from '../services/activity.service';

const WeeklyActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    ActivityService.getWeeklyActivities().then((data) => {
      setActivities(data);
    });
  }, []);

  const addComment = (activityId, comment) => {
    ActivityService.addComment(activityId, comment).then((updatedActivity) => {
      setActivities(activities.map((activity) =>
        activity._id === activityId ? updatedActivity : activity
      ));
    });
  };

  return (
    <div>
      <h2>Weekly Activities</h2>
      {activities.map((activity) => (
        <div key={activity._id}>
          <h3>{activity.description}</h3>
          <p>{activity.status}</p>
          <p>{activity.dueDate}</p>
          <input
            type="text"
            placeholder="Add a comment"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addComment(activity._id, e.target.value);
                e.target.value = '';
              }
            }}
          />
          <div>
            {activity.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyActivities;
