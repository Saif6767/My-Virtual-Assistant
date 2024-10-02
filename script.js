let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let gif = document.querySelector("#gif");

// Make a Speak Function
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = "hi-IN"; // Changed to "hi-IN" for Hindi (India)
    window.speechSynthesis.speak(speech);
}

// Make a WishMe function
function wishMe() {
    let date = new Date();
    let hours = date.getHours();

    if (hours < 12) {
        speak("Good Morning Saif Sir");
    } else if (hours < 16) {
        speak("Good Afternoon Saif Sir");
    } else {
        speak("Good Evening Saif Sir");
    }
}

// Use addEventListener for Call Wish function
window.addEventListener("load", () => {
    // Wish function Call
    wishMe();
});

// Make a SpeechRecognition object
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    content.innerText = transcript;
    // AI Function Call
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    gif.style.display = "block";
});

// AI Reply function
function takeCommand(message) {
    btn.style.display = "flex";
    gif.style.display = "none";

    if (message.includes("hello") || message.includes("hi")) {
        speak("Hello Saif Sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am Shifra, your virtual assistant, created by Saif Ali Khan.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google.com")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook.com")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram.com")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak(`The current time is ${time}`);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace(/shipra|shifra/gi, "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace(/shipra|shifra/gi, "")}`, "_blank");
    }
}

// Add some error handling
recognition.onerror = (event) => {
    console.log(`Error occurred: ${event.error}`);
    speak("Sorry, I didn't quite catch that. Can you please try again?");
}

// Add some visual feedback
recognition.onstart = () => {
    content.innerText = "Listening...";
}

recognition.onend = () => {
    content.innerText = "Stopped listening.";
    btn.style.display = "flex"; // Show the button again after stopping
    gif.style.display = "none"; // Hide the GIF again
}
