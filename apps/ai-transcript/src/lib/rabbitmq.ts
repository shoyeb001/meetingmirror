import ampq from 'amqplib';
export let channel: ampq.Channel;
import config from '../config/config';

export const initRabbitMq = async () => {
    const connection = await ampq.connect(config.RMQ_URL);
    channel = await connection.createChannel();
    console.log('RabbitMQ connected');
    await channel.assertQueue('transcript_uploaded', { durable: true });
    await channel.assertQueue('insight_created', { durable: true });
}

export const publishToQueue = (queue: string, message: any) => {
    if (!channel) {
        throw new Error('Channel is not initialized');
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}
