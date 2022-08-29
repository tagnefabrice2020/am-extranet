import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import "@fullcalendar/daygrid/main.css";
import axios from "axios";
import { API_URL } from "../config";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AppCalendar = () => {
  //const events = [{ title: "today's event", date: new Date() }];

  const getEvents = (fetchInfo: any, callback: any) => {
    retrieveEvents(fetchInfo.startStr, fetchInfo.endStr, callback);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const retrieveEvents = async (from: Date, to: Date, callback: any) => {
    try {
      const response = await axios.get(
        API_URL +
          `/rdv_app/rdv/date?debut=${formatDate(from)}&fin=${formatDate(to)}`
      );
      const events = response.data.results;
      // console.log(events);
      callback(
        events.map((e) => {
          return {
            start: e.date,
            title: JSON.stringify({
              uuid: e.id,
              property_adresse: e.propriete.adresse,
              property_postal_code: e.propriete.codePostal,
              property_city: e.propriete.ville,
              tenant_first_name: e.propriete.locataire.prenom,
              tenant_last_name: e.propriete.locataire.nom,
              lanlord_first_name: e.propriete.bailleur.prenom,
              lanlord_last_name: e.propriete.bailleur.nom,
              title: e.intervention.type
            }),
            backgroundColor: "#ccc"
          };
        })
      );
    } catch (error) {}
  };

  function renderEventContent(eventInfo) {
    //console.log(eventInfo)
    let backgroundColor, textColor;
    const title = JSON.parse(eventInfo.event.title);
    if (title.title === "constat sortant") {
      backgroundColor = "#9b30ff";
      textColor = "#fff";
    } else if (title.title === "constat entrant") {
      backgroundColor = "#0b86aa";
      textColor = "#fff";
    } else if (title.title === "constat avant travaux") {
      backgroundColor = "#6e6767";
      textColor = "#fff";
    } else if (title.title === "constat après travaux") {
      backgroundColor = "#0d9f3f";
      textColor = "#fff";
    } else if (title.title === "constat entrant meublé") {
      backgroundColor = "#fcafac";
      textColor = "#fff";
    } else if (title.title === "constat sortant meublé") {
      backgroundColor = "#8c1567";
      textColor = "#fff";
    } else if (title.title === "visite conseil") {
      backgroundColor = "#bf9053";
      textColor = "#fff";
    } else {
        backgroundColor = "#bb9";
        textColor = "#fff";
    }
    return (
      <Link
        to={`/modifier/${title.uuid}/rendez-vous`}
        style={{ width: `100%` }}
      >
        <Event bg={backgroundColor}>
          <b style={{ color: `${textColor}` }}>{eventInfo.timeText}</b> &nbsp;
          <i style={{ color: `${textColor}` }}>{title.title}</i>
          <EventDetails>
            <p>
              <span className="">
                <strong>
                  <small>Le Locataire est</small>
                </strong>
              </span>
              <span className="badge badge-primary">
                {title.tenant_first_name} {title.tenant_last_name}.
              </span>
            </p>
            <p>
              <span className="">
                <strong>
                  <small>Le Bailleure est</small>
                </strong>
              </span>
              <span className="badge badge-secondary">
                {title.lanlord_first_name} {title.lanlord_last_name}.
              </span>
            </p>
            <p>
              <span>
                <strong>
                  <small>à </small>
                </strong>
              </span>
              <span className="badge badge-success">
                {title.property_adresse}, {title.property_postal_code}{" "}
                {title.property_city}
              </span>
            </p>
          </EventDetails>
        </Event>
      </Link>
    );
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={frLocale}
        events={getEvents}
        eventContent={renderEventContent}
      />
    </>
  );
};

const Event = styled.div`
  padding: 2px;
  width: 100%;
  cursor: pointer;
  /*position:relative;*/
  background-color: ${(props) => (props.bg ? props.bg : null)}!important;
  &:hover div {
    height: auto;
    border: 1px solid rgba(0, 0, 0, 0.5);
    display: block;
    &::after {
      position: absolute;
      content: " ";
      width: 10px;
      height: 10px;
      left: 10px;
      top: -6px;
      border-top: 1px solid rgba(0, 0, 0, 0.5);
      border-left: 1px solid rgba(0, 0, 0, 0.5);
      transform: rotate(45deg);
      background: rgb(255, 255, 255, 0.9);
    }
  }
`;

const EventDetails = styled.div`
  position: absolute;
  top: 30px;
  width: 200px;
  background: rgb(255, 255, 255, 0.99);
  border-radius: 6px;
  height: 0px;
  transition: 0.3s ease;
  z-index: 1;
  display: block;
  padding: 5px;
  display: none;
`;

export default AppCalendar;
