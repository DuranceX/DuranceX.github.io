//点击事件
function switchDarkMode() {
	if ($('body').hasClass('dark')) {
        document.getElementById("dark").style.background = "url('/img/dark.png')";
		document.body.classList.remove('dark');
		localStorage.setItem('noDark', '1');
		localStorage.setItem('dark', '0');
	} else {
        document.getElementById("dark").style.background = "url('/img/light.png')";
		document.body.classList.add('dark');
		localStorage.setItem('dark', '1');
		localStorage.setItem('noDark', '0');
	}
}

/*function subtitleType() {
	new Typed("#subtitle",{
		strings: " ,当你的才华还撑不起你的野心的时候,你就应该静下心来学习,When your talent can't support your ambition ,you should study calmly".split(","),
		startDelay: 300,
		typeSpeed: 150,
		loop: !0,
		backSpeed: 50
	})
}
"function" == typeof Typed ? subtitleType() : $.getScript("https://cdn.jsdelivr.net/npm/typed.js/lib/typed.min.js", subtitleType)*/