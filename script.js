document.addEventListener('DOMContentLoaded', () => {
    animateHeading();
    addScrollEvent();
    setupModal();
    setupStickyHeader();
    contactsModal();
    modalRobotSetup();
});

function animateHeading() {
    const heading = document.querySelector('.name');
    const text = heading.textContent;
    heading.textContent = ''; 

    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = text[i];
        letter.style.animationDelay = `${i * 0.1}s`; 
        heading.appendChild(letter);
    }
}

function addScrollEvent() {
    window.addEventListener('scroll', function() {
        const robot = document.querySelector('.robot');
        const scrollY = window.scrollY;
    
        if (scrollY > 100) { 
            robot.classList.add('saludando');
        } else {
            robot.classList.remove('saludando');
        }
    });
}

function setupModal() {
    const contactsBtn = document.getElementById('contactsBtn');
    const contactsModal = document.getElementById('contactsModal');
    const closeContactsModal = contactsModal.querySelector('.close');

    contactsBtn.addEventListener('click', function() {
        contactsModal.style.display = 'block';
    });

    closeContactsModal.addEventListener('click', function() {
        contactsModal.style.display = 'none';
    });
}

function setupStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const sticky = header.offsetTop;

    window.addEventListener('scroll', function() {
        if (window.scrollY >= sticky) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });
}

function closeModal() {
    document.getElementById('modalRobot').style.display = 'none';
}

function contactsModal() {
    const contactsModal = document.getElementById("contactsModal");
    const contactsBtn = document.getElementById("contactsBtn");
    const closeContactsModal = document.querySelector("#contactsModal .close");

    contactsBtn.onclick = function() {
        contactsModal.style.display = "block";
    }

    closeContactsModal.onclick = function() {
        contactsModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == contactsModal) {
            contactsModal.style.display = "none";
        }
    }
}

function modalRobotSetup() {
    const modalRobot = document.getElementById("modalRobot");
    const eva = document.getElementById("eva");
    const closeButton = modalRobot.querySelector('.close');

    eva.onclick = function() {
        modalRobot.style.display = "block";
    }

    closeButton.onclick = function() {
        modalRobot.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalRobot) {
            modalRobot.style.display = "none";
        }
    }
}
