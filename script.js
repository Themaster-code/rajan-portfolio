document.addEventListener('DOMContentLoaded', () => {
    
    // --- Current Year in Footer ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    setupScrollAnimations();
});

function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.scroll-fade');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// --- View Switching Logic ---
function switchView(view) {
    const thumbnailView = document.getElementById('thumbnail-view');
    const editorView = document.getElementById('editor-view');
    
    // Show nav items
    document.getElementById('nav-item-home').style.display = 'block';
    document.getElementById('nav-item-about').style.display = 'block';
    document.getElementById('nav-item-work').style.display = 'block';

    if (view === 'thumbnail') {
        thumbnailView.style.display = 'block';
        editorView.style.display = 'none';
        
        // Update nav links for thumbnail view
        document.getElementById('nav-link-about').href = '#about-section';
        document.getElementById('nav-link-work').href = '#portfolio-section';
        
        // Scroll to content
        window.scrollTo({
            top: thumbnailView.offsetTop - 80,
            behavior: 'smooth'
        });
    } else if (view === 'editor') {
        editorView.style.display = 'block';
        thumbnailView.style.display = 'none';
        
        // Update nav links for editor view
        document.getElementById('nav-link-about').href = '#editor-philosophy';
        document.getElementById('nav-link-work').href = '#editor-portfolio';
        
        // Scroll to content
        window.scrollTo({
            top: editorView.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    
    // Re-trigger animations for the new view
    setupScrollAnimations();
}

function showHero(e) {
    if(e) e.preventDefault();
    const thumbnailView = document.getElementById('thumbnail-view');
    const editorView = document.getElementById('editor-view');
    
    // Hide nav items on launch page
    document.getElementById('nav-item-home').style.display = 'none';
    document.getElementById('nav-item-about').style.display = 'none';
    document.getElementById('nav-item-work').style.display = 'none';
    
    thumbnailView.style.display = 'none';
    editorView.style.display = 'none';
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// --- Custom Video Player Controls ---
function togglePlay(id) {
    const video = document.getElementById(id);
    const icon = document.getElementById('icon-play-' + id);
    if (video.paused) {
        video.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function toggleMute(id) {
    const video = document.getElementById(id);
    const icon = document.getElementById('icon-mute-' + id);
    if (video.muted) {
        video.muted = false;
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    } else {
        video.muted = true;
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
}

function skipVideo(id, seconds) {
    const video = document.getElementById(id);
    video.currentTime += seconds;
}

function changeSpeed(id, speed) {
    const video = document.getElementById(id);
    video.playbackRate = parseFloat(speed);
}

function setupVideoProgress(id) {
    const video = document.getElementById(id);
    const progressBar = document.getElementById('progress-' + id);
    if(video && progressBar) {
        video.addEventListener('timeupdate', () => {
            const percentage = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percentage + '%';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupVideoProgress('vid1');
    setupVideoProgress('vid2');
});

function seekVideo(id, event) {
    const video = document.getElementById(id);
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
}

