import { createInsight } from "../worker/insight.worker";
import { channel, initRabbitMq } from "./rabbitmq";
const consumeTranscript = async () => {
    await initRabbitMq();
    channel.consume('transcript_uploaded', async (msg) => {
        if (msg) {
            const data = JSON.parse(msg.content.toString());
            console.log('Received message:', data);
            await createInsight(data.data, data.meetingId);
            console.log('Insight created successfully');
            channel.ack(msg);
        }
    });
}
export default consumeTranscript;