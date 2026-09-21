// components/CoursesComponents/UpcomingBatches.js

"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/CoursesComponents/Upcomingbatches.module.css";
import SectionHeading from "./SectionHeading";
import { useInView } from "react-intersection-observer";
import { Clock, Users, Zap, CalendarDays } from "lucide-react";
import { usePopupForm } from "../context/Popupformcontext";

/*
  Expected `data` shape:
  {
    title: "<html string>",
    subtitle: "optional plain text",
    batches: [
      {
        id: "batch-1",
        session: "Morning" | "Evening" | any label,
        timeRange: "7:00 AM – 9:00 AM",
        startInDays: 7,                  // optional; creates a date relative to today
        startsAt: "2026-09-01T07:00:00", // optional fixed ISO string, used when startInDays is absent
        mode: "Online" | "Offline" | "Hybrid",
        seatsLeft: 4,
        totalSeats: 20,
        whatsappNumber: "919999999999", // digits only, country code first
        whatsappMessage: "optional prefilled text",
        enrollHref: "optional link, defaults to #enroll",
      },
      ...
    ]
  }
*/

const getCountdownParts = (startsAt) => {
  if (!startsAt) return null;
  const diff = new Date(startsAt).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
};

const getRelativeStart = (daysFromToday, time = "09:00") => {
  const start = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  start.setDate(start.getDate() + daysFromToday);
  start.setHours(hours, minutes, 0, 0);
  return start;
};

const formatStartDate = (date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const defaultData = {
  title: "Upcoming Batches",
  subtitle: "Choose a schedule that works for you and reserve your seat.",
  batches: [
    {
      id: "demo-morning-batch",
      session: "Morning",
      timeRange: "7:00 AM - 9:00 AM",
      startInDays: 7,
      batchTime: "07:00",
      mode: "Online",
      fees:"50,000 /-",
      seatsLeft: 6,
      totalSeats: 10,
      whatsappNumber: "919004001938",
      whatsappMessage: "Hi! I would like to know more about the morning batch.",
      enrollHref: "#enroll",
    },
    {
      id: "demo-evening-batch",
      session: "Evening",
      timeRange: "7:00 PM - 9:00 PM",
      startInDays: 9,
      batchTime: "19:00",
      mode: "Hybrid",
      fees:"50,000 /-",
      seatsLeft: 4,
      totalSeats: 10,
      whatsappNumber: "919004001938",
      whatsappMessage: "Hi! I would like to know more about the evening batch.",
      enrollHref: "#enroll",
    },
  ],
};

const UpcomingBatches = ({ data }) => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  data = data || defaultData;

  const batches = data.batches || [];

  return (
    <div
      ref={sectionRef}
      className={`${styles.containerYds} ${
        sectionInView ? styles.fadeIn : styles.hidden
      }`}
    >
      <div className={styles.eyebrow}>
        <Zap size={13} className={styles.eyebrowIcon} strokeWidth={2.5} />
        Seats filling fast
      </div>

      <SectionHeading titleHtml={data.title} description={data.subtitle} />

      {batches.length > 0 ? (
        <div className={styles.batchRow}>
          {batches.map((batch, index) => (
            <BatchTicket key={batch.id || index} batch={batch} index={index} />
          ))}
        </div>
      ) : (
        <p className={styles.noBatches}>
          No batches are open for enrollment right now. Check back soon.
        </p>
      )}
    </div>
  );
};

const BatchTicket = ({ batch, index }) => {
  const { openPopup } = usePopupForm();

  const [startAt] = useState(() => {
    if (typeof batch.startInDays === "number") {
      return getRelativeStart(batch.startInDays, batch.batchTime);
    }
    return batch.startsAt ? new Date(batch.startsAt) : null;
  });

  const [ticketRef, ticketInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  });

  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(startAt)
  );

  useEffect(() => {
    if (!startAt) return;
    const interval = setInterval(() => {
      setCountdown(getCountdownParts(startAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [startAt]);

  const startDate = startAt ? formatStartDate(startAt) : batch.startDate;

  const sessionKey = (batch.session || "").toLowerCase().includes("evening")
    ? "evening"
    : "morning";

  const totalSeats = batch.totalSeats || 0;
  const seatsLeft = typeof batch.seatsLeft === "number" ? batch.seatsLeft : null;
  const seatsFilledPct =
    totalSeats && seatsLeft !== null
      ? Math.min(100, Math.round(((totalSeats - seatsLeft) / totalSeats) * 100))
      : null;
  const isAlmostFull = seatsLeft !== null && totalSeats && seatsLeft / totalSeats <= 0.25;

  const whatsappHref = batch.whatsappNumber
    ? `https://wa.me/${batch.whatsappNumber}?text=${encodeURIComponent(
        batch.whatsappMessage ||
          `Hi! I'd like to know more about the ${batch.session || ""} batch starting ${
            batch.startDate || "soon"
          }.`
      )}`
    : null;

  return (
    <div
      ref={ticketRef}
      className={`${styles.ticket} ${
        ticketInView ? styles.ticketVisible : styles.ticketHidden
      }`}
      style={{ "--ticket-delay": `${index * 0.12}s` }}
      data-session={sessionKey}
    >
      <div className={styles.ticketStub}>
        <div className={styles.sessionBadge}>
          <CalendarDays size={16} className={styles.sessionIcon} strokeWidth={2.5} />
          {batch.session || "Batch"}
        </div>

        {isAlmostFull && (
          <div className={styles.hurryFlag}>
            <Zap size={11} strokeWidth={2.5} />
            Hurry up
          </div>
        )}

        <div className={styles.timeRow}>
          <Clock size={14} className={styles.rowIcon} strokeWidth={2.5} />
          <span>{batch.timeRange || "Time to be announced"}</span>
        </div>

        <div className="w-full flex justify-start gap-2">
            {batch.mode && <div className={styles.modeChip}>{batch.mode}</div>}
            {batch.fees && <div className={`font-sans font-semibold ${styles.modeChip}`}>&#x20B9; {batch.fees}</div>}
        </div>

        {seatsLeft !== null && totalSeats > 0 && (
          <div className={styles.seatsBlock}>
            <div className={styles.seatsLabel}>
              <Users size={14} className={styles.rowIcon} strokeWidth={2.5} />
              <span>
                {seatsLeft <= 0
                  ? "Waitlist only"
                  : `${seatsLeft} of ${totalSeats} seats left`}
              </span>
            </div>
            <div className={styles.seatsTrack}>
              <div
                className={styles.seatsFill}
                style={{ width: `${seatsFilledPct}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Perforated tear line between ticket info and the action stub */}
      <div className={styles.tearLine} aria-hidden="true">
        <span className={styles.notch} data-side="left"></span>
        <span className={styles.perforation}></span>
        <span className={styles.notch} data-side="right"></span>
      </div>

      <div className={styles.actionStub}>
        <a
          href={batch.enrollHref || "#enroll"}
          className={styles.enrollButton}
          onClick={(event) => {
            event.preventDefault();
            openPopup();
          }}
        >
          <Zap size={15} strokeWidth={2.5} />
          Enroll now
        </a>

        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
            aria-label={`Ask about the ${batch.session || ""} batch on WhatsApp`}
          >
            {/* <MessageCircle size={18} strokeWidth={2.5} /> */}
            Ask on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
};

export default UpcomingBatches;