let portFromCS;

browser.runtime.onMessage.addListener((message) => {
    console.log("received 1 message", message);
});

browser.runtime.onConnect.addListener((port) => {
    portFromCS = p;
    console.log("connected to", port);
    portFromCS.onMessage.addListener((message) => {
        console.log("received message", message);
    });
});

browser.webNavigation.onBeforeNavigate.addListener((details) => {
    console.log("Before navigation", details);

    if (portFromCS) {
        portFromCS.postMessage({
            location: details.url
        });
    }
});