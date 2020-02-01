import { EventType } from "./types";

/**
 * 发送事件
 *
 * @param event 事件名称
 * @param data 事件数据
 */
export default function dispatchEvent<T>(eventType: EventType, data: T) {
  const customEvent = new CustomEvent(eventType, { detail: data });

  window.dispatchEvent(customEvent);
}
