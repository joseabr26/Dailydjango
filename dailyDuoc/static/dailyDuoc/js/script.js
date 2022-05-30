window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0);
});

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function openNav() {
    document.getElementById("myNav").style.width = "100%";
};

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
};

function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "leer mas";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "leer menos";
        moreText.style.display = "inline";
    };
};

/*formulario*/

const formulario = document.getElementById('formulario');

$("#mensajeError1").hide();

//Funcion encargada de enviar correo a smtp
function sendEmail(email, mensaje) {
    Email.send({

        Host: "smtp.mailtrap.io",
        Username: "10ef1dc05d2969",
        Password: "25c702958bf97a",
        To: 'carlosvkohler@gmail.com',
        From: email,
        Subject: "Test Email",
        Body: mensaje
    }).then(
        message => alert("Correo enviado")
    );
}

//Se verifica el correo ingresado
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function initMap() {
    var coord = { lat: -33.4003076, lng: -70.5570257 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });

    var request = {
        placeId: 'ChIJff405eHPYpYR-3wCBkWbGEQ'
    };
    var service = new google.maps.places.PlacesService(map); // map se usa igual que para poner el mapa

    service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place.reviews); //esto imprime en la consola las reviews 
        }
    });
};

//Se encarga de cargar elementos al menu de comidas
$("menu.html").ready(function() {
    fetch("https://raw.githubusercontent.com/TecaFondo/DobleZeta/main/restaurant/static/restaurant/json/menu.JSON")
        .then(Response => Response.json())
        .then(data => {

            $.each(data.pizzas, (function(i, item) {
                $("#pizzaP").append('<div class="platillo">' + item.foto + item.nombre + item.descripcion + '<div class="precio">' + item.precio + '</div>' + '</div>');
            }));

            $.each(data.sandwiches, (function(i, item) {
                $("#sandwichP").append('<div class="platillo">' + item.foto + item.nombre + item.descripcion + '<div class="precio">' + item.precio + '</div>' + '</div>');
            }));
            $.each(data.cafeteria, (function(i, item) {
                $("#cafeteriaP").append('<div class="platillo">' + item.foto + item.nombre + item.descripcion + '<div class="precio">' + item.precio + '</div>' + '</div>');
            }));
            $.each(data.plato, (function(i, item) {
                $("#platoP").append('<div class="platillo">' + item.foto + item.nombre + item.descripcion + '<div class="precio">' + item.precio + '</div>' + '</div>');
            }));
            $.each(data.bebidas, (function(i, item) {
                $("#bebidaP").append('<div class="platillo">' + item.foto + item.nombre + item.descripcion + '<div class="precio">' + item.precio + '</div>' + '</div>');
            }));

        })
});


//validadores de inicio de sesion
$("#mensajeError").hide();
$("#mensajeErrorPass").hide();
$("#loginBTN").click(function() {
    var correo = $("#correo").val();
    if (IsEmail(correo) && correo != "") {
        if ($("#pass").val() != "") {
            $("#mensajeError").hide();
            alert("inicio sesion exitoso");
        } else {
            $("#mensajeError").show();
        }
    } else {
        $("#mensajeError").show();
    }
});

//validador de creacion de usuarios
$("#crearUsr").click(function() {
    var correo = $("#newcorreo").val();

    if (IsEmail(correo) && correo != "") {
        $("mensajeError1").hide();
        if (($("#clave1").val() != "")) {
            if (($("#clave2").val()) == ($("#clave1").val())) {
                $("#mensajeError1").hide();
                $("#mensajeErrorPass").hide();
                alert("Nuevo usuario creado");
            } else {
                $("#mensajeErrorPass").show();
            }
        }
    } else {
        $("mensajeError1").show();
    }
})

//validacion de correo de recuperacion
$("#mensajeErrorMail").hide()
$("#recuperar").click(function() {
    if (IsEmail($("#recupEmail").val())) {
        $("#mensajeErrorMail").hide();
    } else {
        $("#mensajeErrorMail").show();
    }
})

//se encarga de validar correo, obtener info de textfield y enviar correo.
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = document.getElementById("EntradaMail").value;
    var mensaje = document.getElementById("infoBox").value;

    if (IsEmail(email)) {
        console.log("Se aprueba correo")
        if (mensaje != null) {
            console.log("Se aprueba mensaje")
            sendEmail(email, mensaje);
            console.log("Mensaje enviado")
            return true;
        }
    } else {
        alert("Correo Incorrecto")
        return false;
    }
});

//encargado de controlar flechita BTT.
myID = document.getElementById("flechitaMenu");
var myScrollFunc = function() {
    var y = window.scrollY;
    if (y >= 200) {
        myID.className = "fixed-bottom show"
    } else {
        myID.className = "fixed-bottom hide"
    }
};

/*API*/

window.addEventListener('load', () => {
    let lon
    let lat

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            /*console.log(posicion.coords.latitude)*/
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            let temperaturaValor = document.getElementById('temperatura-valor')
            let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

            let ubicacion = document.getElementById('ubicacion')
            let iconoAnimado = document.getElementById('icono-animado')

            let vientoVelocidad = document.getElementById('viento-velocidad')

            const url = 'https://api.openweathermap.org/data/2.5/weather?q=Viña&lang=es&units=metric&appid=6a665223ff4469670b30b1b8357fe566'

            fetch(url)
                .then(response => { return response.json() })
                .then(data => {

                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = temp + '°C'

                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name

                    vientoVelocidad.textContent = data.wind.speed + 'm/s'

                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg'
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg'
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg'
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg'
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg'
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg'
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            break;
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
})