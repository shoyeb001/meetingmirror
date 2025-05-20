import consumeTranscript from "./lib/consume";

async function main() {
    try {
        console.log('Starting the ai transcript service...');
        await consumeTranscript();
    } catch (error) {
        console.error("Failed to start AI Service:", error);
        process.exit(1);
    }
}
main();