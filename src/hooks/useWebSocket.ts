"use client";

import { userSelector } from "@/redux/features/authSlice";
import { receiveNotification } from "@/redux/features/notificationSlice";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef(false);
  const user = useAppSelector(userSelector);

  useEffect(() => {
    let ws: WebSocket;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let reconnectTimeout: NodeJS.Timeout;

    audioRef.current = new Audio("/audio/notification.wav");

    const handleInteraction = () => {
      userInteractedRef.current = true;
      document.removeEventListener("click", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);

    // Connect to WebSocket server
    const connect = () => {
      ws = new WebSocket(`${process.env.NEXT_PUBLIC_WSS_API}`);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send(
          JSON.stringify({
            type: "init",
            userId: user?.userId || "",
          })
        );
      };

      // Handle WebSocket messages
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        dispatch(receiveNotification(message));

        if (userInteractedRef.current) {
          audioRef.current?.play().catch(console.warn);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });

        reconnectTimeout = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      ws?.close();
      document.removeEventListener("click", handleInteraction);
    };
  }, [dispatch, user?.userId]);

  return socketRef;
};
