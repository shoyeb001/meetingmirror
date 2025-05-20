import { Meeting } from "../model/meeting.model";
import { channel, initRabbitMq } from "./rabbbitmq";
export const consumeQueue = async () => {
    await initRabbitMq();
    channel.consume('insight_created', async (msg) => {
        if (msg) {
            try {
                const data = await JSON.parse(msg.content.toString());
                console.log('Received message:', data);
                console.log(data.meetingId);
                console.log(data.insight);
                const rawMessage = data.insight;
                console.log('rawMessage:', rawMessage);
                const jsonInsight = rawMessage.replace(/^```JSON\s*/i, '').replace(/```$/, '').trim();
                console.log('jsonInsight:', jsonInsight);
                await Meeting.findByIdAndUpdate(data.meetingId, {
                    analytics: JSON.parse(jsonInsight),
                    status: "completed"
                });
                channel.ack(msg);
            } catch (error) {
                console.error('Error processing message:', error);
            }

        }
    });
}