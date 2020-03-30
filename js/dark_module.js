function closeDarkMode0() {
	document.body.classList.remove('dark');
	document.cookie = "dark=0;path=/"
	bgView.style.backgroundImage = "url(https://gitee.com/wtrwx/wtrwxIMG/raw/master/background.png)"
	header.style.height = "100%";
	//console.log('夜间模式关闭0');
}
function openDarkMode1() {
	document.body.classList.add('dark');
	document.cookie = "dark=1;path=/"
	bgView.style.backgroundImage = ""
	header.style.height = "50%";
	//console.log('夜间模式开启1');
}
function closeDarkMode2() {
	document.body.classList.remove('dark');
	document.cookie = "dark=2;path=/"
	bgView.style.backgroundImage = "url(https://gitee.com/wtrwx/wtrwxIMG/raw/master/background.png)"
	header.style.height = "100%";
	//console.log('夜间模式关闭2');
}
function openDarkMode3() {
	document.body.classList.add('dark');
	document.cookie = "dark=3;path=/"
	bgView.style.backgroundImage = ""
	header.style.height = "50%";
	//console.log('夜间模式开启3');
}
function darkMode() {
	openDarkMode1();
	openDarkMode3();
	
	// var date = new Date();
	// var hour = date.getHours();
	// var dark = document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	// if (matchMedia('(prefers-color-scheme: dark)').matches) {
	// 	openDarkMode3();
	// } else {
	// 	if (hour >= 21 || hour < 7) {
	// 		if (dark == '' || dark == '0' || dark == '1' || dark == '3') {
	// 			openDarkMode3();
	// 		} else if (dark == '2') {
	// 			closeDarkMode2();
	// 		}
	// 	} else {
	// 		if (dark == '' || dark == '0' || dark == '3') {
	// 			closeDarkMode0();
	// 		} else if (dark == '2') {
	// 			closeDarkMode2();
	// 		}
	// 		if (dark == '1') {
	// 			openDarkMode1();
	// 		}
	// 	}
	// }

};

function switchDarkMode() {
	var dark = document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var date = new Date();
	var hour = date.getHours();
	if (hour >= 21 || hour < 7) {
		if (dark == '1' || dark == '3') {
			closeDarkMode2();
		} else if (dark == '2') {
			openDarkMode1();
		}
	} else {
		if (dark == '0' || dark == '2') {
			openDarkMode1();
		} else if (dark == '1' || dark == '3') {
			closeDarkMode0();
		}
	}
}