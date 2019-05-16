import { Injectable } from '@nestjs/common';
import { Consumer, KafkaClient } from 'kafka-node';
import { Subject } from 'rxjs';

import { KafakConsumer } from './kafka.interfaces';

@Injectable()
export class KafkaService {
    client: KafkaClient;

    consumers: KafakConsumer[] = [];
    public consumerTopicEvents = new Subject<any>();
    public consumerErrors = new Subject<any>();

    constructor() {
        // Create a client ... aka connection to kafak host
        this.client = new KafkaClient({ kafkaHost: 'localhost:9092' });
    }

    // Start consuming a new topic
    consume(newTopic: string): void {
        // Create a new consumer with the client and topics to which you want to subscribe
        const newConsumer = new Consumer(this.client, [{ topic: newTopic, partition: 0 }], { autoCommit: false });

        // Listen for messages
        newConsumer.on('message', message => {
            this.consumerTopicEvents.next(message);
        });
        // Listen for consumer errors
        newConsumer.on('error', error => {
            this.consumerErrors.next(error);
        });

        // Add the consumer to our list of consumers
        this.consumers.push({topic: newTopic, consumer: newConsumer});
    }
}
