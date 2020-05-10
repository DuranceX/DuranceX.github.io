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