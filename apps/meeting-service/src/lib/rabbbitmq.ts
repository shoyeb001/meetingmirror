import ampq from 'amqplib';
import config from '../config/config';
export let channel: ampq.Channel;

export const initRabbitMq = async () => {
    const connection = await ampq.connect(config.RMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('transcript_uploaded');
    await channel.assertQueue('insight_created');
}

export const publishToQueue = (queue: string, message: any) => {
    if (!channel) {
        throw new Error('Channel is not initialized');
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}
