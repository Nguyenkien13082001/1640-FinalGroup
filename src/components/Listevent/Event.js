import React, { useState, useEffect } from "react";
import "./Event.css";
import apiClient from "../../api/apiClient";
import { Link } from "react-router-dom";

const Event = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);
  const getEvent = async () => {
    try {
      const response = await apiClient.get(
        "https://comp1640.pythonanywhere.com/events"
      );
      console.log("check", response);
      setEvents(response);
    } catch (error) {
      console.log("Lỗi ròi");
    }
  };
  return (
    <div className="blog">
      <div className="content">
        <div className="post-container">
          {events.map((event) => (
            <div className="post" key={event._id}>
              <div className="post-content">
                <h2>Title: {event.name}</h2>
                <p>{event.description}</p>
              </div>
              <div className="post-time">
                <span className="time-start">Time Start: {event.start_at}</span>
                <span className="time-end">Time End: {event.end_at}</span>
              </div>
              <hr />

              <div style={{ textAlign: "center" }}>
                <Link to={`/ViewEvent/${event._id}`}>
                  <button className="btnViewPost">View</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
