// Generates a random unique ID for an event.
const getEventId = (): number => {
    return Math.floor(Math.random() * 10000);
};

export default getEventId;