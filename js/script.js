
$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 350, 'linear')
    })
});


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Tech Enthusiast", "Web Developer", "Coder", "Quick Learner"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});


// pre loader start
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setInterval(loader, 500);
}
window.onload = fadeOut;


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}


// Tawk.to chat api
fetch('./env.json')
.then(res => res.json())
.then(env => {

    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = env.TawkAPI;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
})



// contact form
const mailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoenReg = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const nameE = document.getElementsByName('name')[0];
const emailE = document.getElementsByName('email')[0];
const phoneE = document.getElementsByName('phone')[0];
const messageE = document.getElementsByName('message')[0];

const nameT = document.getElementById('nameT');
const mailT = document.getElementById('mailT');
const phoneT = document.getElementById('phoneT');
const msgT = document.getElementById('msgT');

const contactBtn = document.getElementById('contactme');
const activator = ()=>{
    if( nameE.value.length >= 3 && mailReg.test(emailE.value) && messageE.value.length >= 5 ){
        contactBtn.disabled = false;
        contactBtn.style.background = "#2506ad";
        contactBtn.style.color = "#fff";
        document.querySelector(".button-area i").style.color = "#fff";
    }else{
        contactBtn.disabled = true;
        contactBtn.style.background = "#dddddd";
        contactBtn.style.color = "black";
        document.querySelector(".button-area i").style.color = "black";
    }
}

const setRight = (e) => {
    e.style.display = "block";
    e.className = "far fa-check-circle";
    e.style.color = "green";
}
const setWrong = (e) => {
    e.style.display = "block";
    e.className = "far fa-times-circle";
    e.style.color = "red";
}

nameE.addEventListener('blur', (e) => {
    if (nameE.value.length >= 3) setRight(nameT);
    else setWrong(nameT);
    activator();
})

emailE.addEventListener('blur', (e) => {
    if (mailReg.test(emailE.value)) setRight(mailT);
    else setWrong(mailT);
    activator();
})

phoneE.addEventListener('blur', (e) => {
    if (phoenReg.test(phoneE.value)) setRight(phoneT);
    else setWrong(phoneT);
})

messageE.addEventListener('blur', (e) => {
    if (messageE.value.length >= 5) setRight(msgT);
    else setWrong(msgT);
    activator();
})


// mail to dhruv vavliya
contactBtn.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('./env.json')
        .then(res => res.json())
        .then(env => {

            const params = {
                SecureToken: env.SecureToken,
                From: env.FromID,
                To: env.ToID,
                Subject: `Connection request from ${nameE.value}`,
                Body: `
                    <br><br>
                    <div style=" width: 80%; margin: auto; border: 2px solid black; border-radius: 6px; padding: 12px; background-color:azure;" >
                        <b><i>name:</i></b> ${nameE.value} <br>
                        <b><i>email:</i></b> ${emailE.value} <br>
                        <b><i>phone:</i></b> ${phoneE.value} <br>
                        <br><hr><br><pre><b>
                            ${messageE.value}
                        </b></pre><br>  
                    </div>
                `
            };

            Email.send(params)
                .then((message) => {
                    if (message == 'OK') {
                        alert(':) Mail sent successfully. I will get back to you as soon as possible.');
                        nameE.value = "";
                        emailE.value = "";
                        phoneE.value = "";
                        messageE.value = "";
                        nameT.style.display = "none";
                        mailT.style.display = "none";
                        phoneT.style.display = "none";
                        msgT.style.display = "none";
                    }else {
                        alert(`:( Unfortunately, Mail didn't send.\nPlease try to contact via another way.`);
                    }
                })
                .catch(message => {
                    alert(`:( Unfortunately, Mail didn't send.\nPlease try to contact via another way.`);
                });
        });

})


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .whatsapp', { interval: 600 });
srtop.reveal('.home .mail', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });



/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 300 });
srtop.reveal('.about .content .tag', { delay: 400 });
srtop.reveal('.about .content p', { delay: 300 });
srtop.reveal('.about .content .box-container', { delay: 300 });
srtop.reveal('.about .content .resumebtn', { delay: 300 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });