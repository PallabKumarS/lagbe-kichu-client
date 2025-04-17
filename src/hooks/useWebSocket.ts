"use client";

import { receiveNotification } from "@/redux/features/notificationSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/notification.mp3");

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WSS_API}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(receiveNotification(message));
      audioRef.current?.play();
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return socketRef;
};
