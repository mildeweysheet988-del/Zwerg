'use strict';

/**
 * Konfetti-Burst-Effekt
 * Erzeugt einen Konfetti-Effekt beim Laden der Seite
 * @function burstConfetti
 */
function burstConfetti() {
    const colors = [
        '#FF6B9D',
        '#FFC75F',
        '#845EC2',
        '#00D9FF',
        '#FF9671',
        '#F9F871',
        '#38ADA9',
        '#D291BC'
    ];
    
    const confettiCount = 60;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < confettiCount; i++) {
        // Konfetti-Element erstellen
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Zufällige Farbe wählen
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.background = color;
        
        // Position in der Mitte des Bildschirms
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        
        // Winkel und Geschwindigkeit berechnen
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 8 + Math.random() * 4;
        const tx = Math.cos(angle) * velocity * 60;
        
        // CSS-Variable setzen und Animation starten
        confetti.style.setProperty('--tx', tx + 'px');
        const duration = 0.8 + Math.random() * 0.6;
        confetti.style.animation = `confetti-burst ${duration}s ease-out forwards`;
        
        // Element zum DOM hinzufügen
        document.body.appendChild(confetti);
        
        // Element nach Animation entfernen
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration * 1000 + 200);
    }
}

/**
 * Initialisiert die Seite wenn das DOM vollständig geladen ist
 * @function initPage
 */
function initPage() {
    // Konfetti-Effekt nur bei ersten Besuch aktivieren
    if (!sessionStorage.getItem('confettiShown')) {
        burstConfetti();
        sessionStorage.setItem('confettiShown', 'true');
    }
}

// Event-Listener für Seiten-Laden
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// Fallback für window load Event
window.addEventListener('load', initPage);
