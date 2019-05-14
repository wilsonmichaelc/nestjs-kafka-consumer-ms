import { Controller, Get, Logger, Param } from '@nestjs/common';

import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {

    constructor(private kafkaService: KafkaService, private logger: Logger) {
        /*
         *  Optionally, subscribe to consumer events and errors
         */
        this.kafkaService.consumerTopicEvents.subscribe((event) => {
            this.logger.log('Consumer Event', JSON.stringify(event));
        });

        this.kafkaService.consumerErrors.subscribe((error) => {
            this.logger.error('Consumer Error', JSON.stringify(error));
        });
    }

    // Consume a new topic
    @Get('consume/:topic')
    consume(@Param('topic') topic): boolean {
        this.kafkaService.consume(topic);
        return true;
    }

}
