import { Consumer } from 'kafka-node';

export interface KafakConsumer {
    topic: string;
    consumer: Consumer;
}
