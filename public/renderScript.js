console.log(document.getElementById('#drawer'+window.connectScript));
if(window.loaded) window.loaded=true;
Plutchik({
    element: '#drawer'+window.connectScript,
    labels: [
               ["ecstasy", "admiration", "terror", "amazement", "grief", "loathing", "rage", "vigilance"],
               ["joy", "trust", "fear", "surprise", "sadness", "disgust", "anger", "anticipation"],
               ["serenity", "acceptance", "apprehension", "distraction", "pensiveness", "boredom", "annoyance", "interest"],
               ["optimistm", "love", "submission", "awe", "disapproval", "emorse", "contempt", "aggressiveness"]
            ]
}).elementClick().subscribe(data => {
    window.elemData = data;
    console.log('Clicked ', data);
})
setTimeout(() => {
    document.getElementById(window.connectScript).remove();
}, 1000)
