import { Injectable } from '@angular/core';
// import { SubscribableEvent } from './events';
// import { UnsubscribableEvent } from './unsubcribable-event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private channels: any = [];

  constructor() {}

  /**
   * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
   *
   * @param topic the topic to subscribe to
   * @param handler the event handler
   */
  // subscribe(topic: string, ...handlers: Function[]) {
  subscribe(topic: string, handler: (args: any) => void) {
    if (!this.channels[topic]) {
      this.channels[topic] = [];
    }
    this.channels[topic].push(handler);

    // handlers.forEach((handler) => {
    //     this.channels[topic].push(handler);
    // });

    // return new UnsubscribableEvent({ topic, handler }, this);
  }

  /**
   * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
   *
   * @param topic the topic to unsubscribe from
   * @param handler the event handler
   *
   * @return true if a handler was removed
   */
  unsubscribe(topic: string, handler: (args: any) => void | null) {
    const t = this.channels[topic];
    if (!t) {
      // Wasn't found, wasn't removed
      return false;
    }

    if (!handler) {
      // Remove all handlers for this topic
      delete this.channels[topic];
      return true;
    }

    // We need to find and remove a specific handler
    const i = t.indexOf(handler);

    if (i < 0) {
      // Wasn't found, wasn't removed
      return false;
    }

    t.splice(i, 1);

    // If the channel is empty now, remove it from the channel map
    if (!t.length) {
      delete this.channels[topic];
    }

    return true;
  }

  /**
   * Publish an event to the given topic.
   *
   * @param topic the topic to publish to
   * @param eventData the data to send as the event
   */
  publish(topic: string, ...args: any[]) {
    const t = this.channels[topic];
    if (!t) {
      return null;
    }

    const responses: any[] = [];
    t.forEach((handler: any) => {
      responses.push(handler(...args));
    });
    return responses;
  }
}