const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

/*
 * Prevents function execution if time between interactions is less than delay
 */
const debounce = (cb, delay = 1000) => {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    };
};

/*
 * Prevents function execution if call frequency is more than one per set period of time
 */
const throttle = (cb, delay = 1000) => {
    let shouldWait = false;
    let waitingArgs = null;
    const timeoutFunc = () => {
        if (waitingArgs === null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };
    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
    };
};

const updateDefaultText = () => {
    incrementCount(defaultText);
};

const updateDebounceText = debounce(() => {
    incrementCount(debounceText);
});

const updateThrottleText = throttle(() => {
    incrementCount(throttleText);
});

function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0) + 1;
}

document.addEventListener('mousemove', () => {
    updateDefaultText();
    updateDebounceText();
    updateThrottleText();
});
