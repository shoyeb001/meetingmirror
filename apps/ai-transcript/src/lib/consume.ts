import { createInsight } from "../worker/insight.worker";
import { channel, initRabbitMq } from "./rabbitmq";
const consumeTranscript = async () => {
    await initRabbitMq();
    channel.consume('transcript_uploaded', async (msg) => {
        if (msg) {
            const data = JSON.parse(msg.content.toString());
            await createInsight(data.data, data.meetingId);
            channel.ack(msg);
        }
    });
}
export default consumeTranscript;