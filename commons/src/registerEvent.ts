import { EventType } from "./types";

/**
 * 注册事件
 *
 * @param eventType 事件类型
 * @param listener 事件监听器
 */
export default function regsiterEvent<T>(
  eventType: EventType,
  listener: (event: CustomEvent<T>) => void
) {
  window.addEventListener(eventType, listener, false);

  return () => window.removeEventListener(eventType, listener, false);
}
