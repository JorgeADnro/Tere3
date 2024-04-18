let myButton;

// Esperar hasta que el documento HTML y todos los recursos asociados se hayan cargado completamente
document.addEventListener("DOMContentLoaded", function () {
	myButton = document.getElementById("myBtn");

	window.onscroll = function () {
		scrollFunction();
		scrollFunctionBTT();
	};

	if (myButton) {
		myButton.addEventListener("click", function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}

});

// Función para cambiar el estilo del botón "volver arriba" basado en la posición del scroll
function scrollFunctionBTT() {
	// Verificar si myButton está definido antes de intentar acceder a su propiedad style
	if (myButton) {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			myButton.style.opacity = "1";
		} else {
			myButton.style.opacity = "0";
		}
	}
}

// Función para cambiar el estilo de la barra de navegación basado en la posición del scroll
function scrollFunction() {
	const navbarExample = document.getElementById("navbarExample");
	// Verificar si navbarExample está definido antes de intentar acceder a su propiedad classList
	if (navbarExample) {
		if (document.documentElement.scrollTop > 30) {
			navbarExample.classList.add("top-nav-collapse");
		} else if (document.documentElement.scrollTop < 30) {
			navbarExample.classList.remove("top-nav-collapse");
		}
	}
}

// Hover en escritorio
function toggleDropdown(e) {
	// Verifica si el evento tiene un objetivo y si ese objetivo es un descendiente de un elemento con la clase "dropdown"
	const _d = e.target.closest(".dropdown");
	// Verifica si el elemento _d está presente en el DOM
	if (_d) {
		let _m = document.querySelector(".dropdown-menu", _d);
		setTimeout(function () {
			// Verifica si _d todavía está presente en el DOM y si el usuario sigue hover sobre él
			if (_d.matches(":hover")) {
				_m.classList.add("show");
				_d.classList.add("show");
				_d.setAttribute("aria-expanded", true);
			} else {
				_m.classList.remove("show");
				_d.classList.remove("show");
				_d.setAttribute("aria-expanded", false);
			}
		}, e.type === "mouseleave" ? 300 : 0);
	}
}
/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	slidesPerView: 2,
	spaceBetween: 70,
	breakpoints: {
		// when window is <= 991px
		991: {
			slidesPerView: 1
		}
	}
});


/* Filter - Isotope */
const gridCheck = document.querySelector('.grid');

if (gridCheck !== null) {
	// init Isotope
	var iso = new Isotope('.grid', {
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// bind filter button click
	var filtersElem = document.querySelector('.filters-button-group');
	filtersElem.addEventListener('click', function (event) {
		// only work with buttons
		if (!matchesSelector(event.target, 'button')) {
			return;
		}
		var filterValue = event.target.getAttribute('data-filter');
		// use matching filter function
		iso.arrange({ filter: filterValue });
	});

	// change is-checked class on buttons
	var buttonGroups = document.querySelectorAll('.button-group');
	for (var i = 0, len = buttonGroups.length; i < len; i++) {
		var buttonGroup = buttonGroups[i];
		radioButtonGroup(buttonGroup);
	}

	function radioButtonGroup(buttonGroup) {
		buttonGroup.addEventListener('click', function (event) {
			// only work with buttons
			if (!matchesSelector(event.target, 'button')) {
				return;
			}
			buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
			event.target.classList.add('is-checked');
		});
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

