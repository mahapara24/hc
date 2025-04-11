// nav toggle
let sidebar=document.querySelector('#sidebar')
let body=document.querySelector('body')
function navToggle(){
body.classList.toggle('overflow-hidden')
sidebar.classList.toggle('flex')
sidebar.classList.toggle('hidden')
}

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assests/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 200,
        "density": {
          "enable": true,
          "value_area": 1200
        }
      },
      "color": {
        "value": "#33e1f1"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": false
      },
      "size": {
        "value": 6,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#33e1f1",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Get the no-code section and nav elements
const noCodeSection = document.querySelector('.flex.justify-center.items-center.flex-col.gap-6.md\\:gap-10.mt-8.md\\:mt-16.px-4');
const nav = document.querySelector('nav');

// Create the scroll animation
ScrollTrigger.create({
    trigger: noCodeSection,
    start: "top 200px",
    end: "bottom top",
    onEnter: () => {
        gsap.to(nav, {
            position: 'fixed',
            top: '20px',
            backgroundColor: 'rgb(0, 0, 0)',
            // backdropFilter: 'blur(10px)',
            duration: 0.3,
            ease: 'power2.out'
        });
    },
    onLeaveBack: () => {
        gsap.to(nav, {
            position: 'relative',
            top: '20px',
            backgroundColor: 'black',
            backdropFilter: 'none',
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Create the scroll animation
ScrollTrigger.create({
  trigger: "#no_code_plat",
  // start: "top 0px",
  onEnter: () => {
    gsap.from('#no_code_plat',{
      scale:0,
      duration:0.5,
      ease:"ease.inOut",
    })
  }
});
gsap.to('#company',{
   x:"-200px",
   duration:1.5,
   repeat:-1,
   ease:"ease.inOut"
})
// Add smooth scroll behavior for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                ease: 'power2.inOut'
            });
        }
    });
});
   // Select all cards
    const cards = document.querySelectorAll('.nocard');

    // Create a GSAP animation for each card
    cards.forEach(card => {
        gsap.fromTo(card, 
            { opacity: 0 }, // Start from opacity 0
            {
                opacity: 1, // End at opacity 1
                duration:1,
                ease:"eqase.inOut",
                scrollTrigger: {
                    trigger: card, // Trigger the animation when the card comes into view
                    start: "top 80%", // Start the animation when the top of the card is 80% from the top of the viewport
                    toggleActions: "play none none reverse", // Play the animation on enter, reverse on leave
                }
            }
        );
    });
// chart js
const ctx = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [
            'Liquidity - 65.00%',
            'Private Sale - 21.00%',
            'Treasury & Reserves - 10.00%',
            'Marketing & Partnerships - 3.00%',
            'Team & Advisors - 1.00%'
        ],
        datasets: [{
            label: 'Distribution',
            data: [65, 1,3, 10, 21 ], // Ensure the data matches the labels
            backgroundColor: [
                'rgb(20, 122, 138)',
                'rgb(255, 255, 255)',
                'rgb(51, 226, 242)',
                'rgb(31, 165, 183)',
                'rgb(43, 195, 212)',
            ],
            borderColor: [
                'rgb(20, 122, 138)',
                'rgb(43, 195, 212)',
                'rgb(31, 165, 183)',
                'rgb(51, 226, 242)',
                'rgb(255, 255, 255)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Disable default legend
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            },
            datalabels: {
                color: 'white', // Change the color of the labels
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = Math.floor(((value / total) * 100).toFixed(2)) + '%';
                    return percentage; // Return the percentage
                },
                anchor: 'center', // Center the label in the segment
                align: 'center', // Align the label in the center
                font: {
                    weight: 'bold', // Make the font bold
                    size: '16' // Set the font size
                },
                rotation: 140 // Rotate the label by 90 degrees
            }
        }
    },
    plugins: [ChartDataLabels] // Register the datalabels plugin
});

// Custom legend creation
const legendContainer = document.getElementById('chartLegend');
myPieChart.data.labels.forEach((label, index) => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `
        <div class="legend-color-box" style="background-color: ${myPieChart.data.datasets[0].backgroundColor[index]}"></div>
        ${label}
    `;
    legendContainer.appendChild(legendItem);
});
// responsive image
function updateImageSource() {
  const image = document.querySelector('.AIAgent');
  if (window.matchMedia("(max-width: 767px)").matches) {
      // Phone
      image.src = './media/750px 450px.svg';
  } else if (window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches) {
      // Tablet
      image.src = './media/1024px 768px.svg';
  } else {
      // Desktop or larger
      image.src = './media/1920px 800.svg';
  }
}

// Initial check
updateImageSource();
window.addEventListener('resize', updateImageSource);