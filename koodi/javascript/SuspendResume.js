function SuspendKCO() {
    window._klarnaCheckout(function (api) {
    api.suspend();
    });
}

function ResumeKCO() {
    window._klarnaCheckout(function (api) {
    api.resume();
    });
}