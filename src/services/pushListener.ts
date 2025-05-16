"use client";

import Pusher from "pusher-js";
let initialized = false;

export function initPusherListener() {
  if (initialized) return;
  initialized = true;

  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  });

  const channel = pusher.subscribe("order-channel");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  channel.bind("status-update", (data: { orderId: string; status: string }) => {
    // store.dispatch(addOrderStatusUpdate(data));
  });
}
