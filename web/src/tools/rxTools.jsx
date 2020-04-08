export const unsubscribeIfCan = (subscription) => {
    if (subscription !== undefined) {
        subscription.unsubscribe();
    }
}