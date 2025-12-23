import './style.css'
import { content } from './data.js'

const mainContent = document.querySelector('#main-content');
const navbar = document.querySelector('#navbar');
const footer = document.querySelector('#footer');

// Simple Router
const routes = {
  home: renderHome,
  about: renderAbout,
  portfolio: renderPortfolio,
  contact: renderContact
};

function navigate(route) {
  window.location.hash = route;
  const renderFunc = routes[route] || renderHome;
  renderFunc();
  window.scrollTo(0, 0);
  initReveal();
  updateActiveLink(route);
}

function updateActiveLink(route) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${route}`) {
      link.classList.add('active');
    }
  });
}

// Initialize navigation
const initNav = () => {
  navbar.innerHTML = `
    <div class="logo" style="cursor: pointer;">GLORIA.</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#portfolio">Works</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="cta-button" style="padding: 10px 25px;">Hire Me</a>
  `;

  navbar.querySelector('.logo').addEventListener('click', () => navigate('home'));

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('href').substring(1);
      navigate(route);
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
};

// --- Page Renderers ---

function renderHome() {
  mainContent.innerHTML = `
    <section class="hero">
      <div class="blob"></div>
      <div class="hero-content reveal">
        <h1>Crafting Stories That <span style="color: var(--accent-gold)">Resonate</span>.</h1>
        <p>Expert Content Strategist & Professional Writer at Pulse Nigeria.</p>
        <div style="display: flex; gap: 20px; justify-content: center;">
          <a href="#portfolio" class="cta-button" onclick="event.preventDefault(); navigate('portfolio')">Explore My Works</a>
          <a href="#contact" class="glass" style="padding: 15px 40px; border-radius: 50px; display: flex; align-items: center; justify-content: center;" onclick="event.preventDefault(); navigate('contact')">Get in Touch</a>
        </div>
      </div>
    </section>

    <!-- Brief About - Home -->
    <section class="section">
      <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
         <div class="reveal">
            <div class="glass" style="padding: 15px;">
              <img src="${content.profile.portrait}" alt="Gloria Portrait" style="border-radius: 15px; width: 100%;">
            </div>
         </div>
         <div class="reveal">
            <h2 style="font-size: 3rem; margin-bottom: 20px;">The Voice of <span style="color: var(--accent-gold)"> nigeria's</span> Digital Landscape.</h2>
            <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 1.2rem;">
              With nearly a decade of experience in Nigeria's leading media houses, I bring a unique perspective to every piece I write. From investigative journalism to brand storytelling, my work is defined by clarity, impact, and authenticity.
            </p>
            <button class="cta-button" onclick="navigate('about')">Read My Story</button>
         </div>
      </div>
    </section>

    <!-- Services Grid - Home -->
    <section class="section glass" style="margin: 0 5%; border-radius: 40px;">
       <div class="container">
          <h2 style="text-align: center; font-size: 3rem; margin-bottom: 60px;">Strategic <span style="color: var(--accent-gold)">Expertise</span></h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
            ${content.services.map(s => `
              <div class="reveal" style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 20px;">${s.icon}</div>
                <h3 style="font-size: 1.8rem; margin-bottom: 15px;">${s.title}</h3>
                <p style="color: var(--text-secondary);">${s.description}</p>
              </div>
            `).join('')}
          </div>
       </div>
    </section>

    <!-- Testimonials -->
    <section class="section reveal">
       <div class="container" style="text-align: center;">
          <h2 style="font-size: 3rem; margin-bottom: 50px;">Words from <span style="color: var(--accent-gold)">Collaborators</span></h2>
          <div class="glass" style="padding: 60px; max-width: 800px; margin: 0 auto;">
            <p style="font-style: italic; font-size: 1.4rem; margin-bottom: 30px;">"${content.testimonials[0].text}"</p>
            <h4 style="font-size: 1.2rem; color: var(--accent-gold);">${content.testimonials[0].name}</h4>
            <p style="color: var(--text-secondary);">${content.testimonials[0].role}</p>
          </div>
       </div>
    </section>
  `;
}

function renderAbout() {
  mainContent.innerHTML = `
    <section class="section" style="padding-top: 150px;">
      <div class="container">
        <h1 class="reveal" style="font-size: 4rem; margin-bottom: 40px; text-align: center;">About <span style="color: var(--accent-gold)">Gloria</span></h1>
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; align-items: start;">
          <div class="reveal">
            <div class="glass" style="padding: 10px;">
              <img src="${content.profile.portrait}" style="border-radius: 15px; width: 100%;">
            </div>
            <div style="margin-top: 30px; display: grid; gap: 15px;">
              <div class="glass" style="padding: 20px;">
                <h4 style="color: var(--accent-gold);">Current Role</h4>
                <p>${content.profile.company}</p>
              </div>
              <div class="glass" style="padding: 20px;">
                <h4 style="color: var(--accent-gold);">Focus Areas</h4>
                <p>Digital Media, Culture, Tech</p>
              </div>
            </div>
          </div>
          <div class="reveal">
            <h2 style="font-size: 2.5rem; margin-bottom: 30px;">More than just a writer, I am a <span style="color: var(--accent-gold)">cultural architect</span>.</h2>
            <div style="color: var(--text-secondary); font-size: 1.1rem; display: grid; gap: 20px;">
              <p>My journey started in the heart of Lagos, fueled by a curiosity for people's stories. Over the years, I've had the privilege of working with some of Nigeria's most influential media platforms, including my current home, Pulse Nigeria.</p>
              <p>At Pulse, I lead content strategies that reach millions of readers daily. My work isn't just about clicks; it's about building communities and reflecting the vibrant reality of West African life through words.</p>
              <p>I believe that in an age of artificial intelligence, human-centered storytelling is more valuable than ever. I specialize in taking complex narratives and making them accessible, engaging, and above all, human.</p>
            </div>
            <div style="margin-top: 50px;">
               <h3 style="margin-bottom: 20px;">Career Highlights</h3>
               <ul style="display: grid; gap: 15px;">
                 <li style="display: flex; gap: 15px; align-items: center;">
                    <span style="color: var(--accent-gold); font-size: 1.5rem;">✓</span> 
                    <span>Led the 2024 Digital Culture series at Pulse Nigeria.</span>
                 </li>
                 <li style="display: flex; gap: 15px; align-items: center;">
                    <span style="color: var(--accent-gold); font-size: 1.5rem;">✓</span> 
                    <span>Published over 50 investigative pieces on West African tech.</span>
                 </li>
                 <li style="display: flex; gap: 15px; align-items: center;">
                    <span style="color: var(--accent-gold); font-size: 1.5rem;">✓</span> 
                    <span>Brand consultant for leading Nigerian fintech startups.</span>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPortfolio() {
  mainContent.innerHTML = `
    <section class="section" style="padding-top: 150px;">
      <div class="container">
        <h1 class="reveal" style="font-size: 4rem; margin-bottom: 20px; text-align: center;">Selected <span style="color: var(--accent-gold)">Works</span></h1>
        <p class="reveal" style="text-align: center; color: var(--text-secondary); margin-bottom: 60px; max-width: 600px; margin-inline: auto;">
          A collection of my best work across journalism, editorial, and brand strategy.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 40px;">
          ${content.articles.map(article => `
            <div class="portfolio-card glass reveal" style="overflow: hidden;">
              <div style="height: 300px; overflow: hidden;">
                <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover; transition: 0.5s;">
              </div>
              <div style="padding: 40px;">
                <span style="color: var(--accent-gold); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${article.category}</span>
                <h3 style="margin: 15px 0 20px 0; font-size: 2rem; line-height: 1.3;">${article.title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 1.1rem;">${article.excerpt}</p>
                <a href="#" class="cta-button" style="padding: 10px 30px;">Read Full Piece</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderContact() {
  mainContent.innerHTML = `
    <section class="section" style="padding-top: 150px; min-height: 100vh;">
      <div class="container" style="max-width: 900px;">
        <div style="text-align: center; margin-bottom: 60px;">
           <h1 class="reveal" style="font-size: 4rem; margin-bottom: 20px;">Let's <span style="color: var(--accent-gold)">Connect</span></h1>
           <p class="reveal" style="color: var(--text-secondary); font-size: 1.2rem;">Whether it's a project inquiry, a collaboration, or just a hello.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 50px;">
           <div class="reveal">
              <div class="glass" style="padding: 30px; margin-bottom: 20px;">
                 <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Email</h4>
                 <p>gloria@pulse.ng</p>
              </div>
              <div class="glass" style="padding: 30px; margin-bottom: 20px;">
                 <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Location</h4>
                 <p>Lagos, Nigeria</p>
              </div>
              <div class="social-links" style="display: flex; gap: 15px; margin-top: 30px;">
                <a href="#" class="glass" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">𝕏</a>
                <a href="#" class="glass" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">Li</a>
              </div>
           </div>
           
           <div class="reveal">
              <form class="glass" style="padding: 50px; display: grid; gap: 25px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                  <input type="text" placeholder="Full Name" style="padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 12px; color: white;">
                  <input type="email" placeholder="Email Address" style="padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 12px; color: white;">
                </div>
                <input type="text" placeholder="Subject" style="padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 12px; color: white;">
                <textarea rows="6" placeholder="Your Message" style="padding: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 12px; color: white; resize: none;"></textarea>
                <button type="submit" class="cta-button">Send Message Instantly</button>
              </form>
           </div>
        </div>
      </div>
    </section>
  `;
}

const initFooter = () => {
  footer.innerHTML = `
    <div class="container">
      <div class="logo" style="margin-bottom: 20px; font-size: 2rem;">GLORIA.</div>
      <p style="color: var(--text-secondary); margin-bottom: 40px; font-size: 1.1rem;">Elevating narratives in the heart of West Africa.</p>
      <div style="border-top: 1px solid var(--glass-border); padding-top: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <p style="font-size: 0.9rem; color: var(--text-secondary);">© 2025 Gloria Adebayo. All rights reserved.</p>
        <div style="display: flex; gap: 30px;">
           <a href="#" style="font-size: 0.9rem; color: var(--text-secondary);">Privacy Policy</a>
           <a href="#" style="font-size: 0.9rem; color: var(--text-secondary);">Terms of Service</a>
        </div>
      </div>
    </div>
  `;
};

const initReveal = () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => observer.observe(reveal));
};

const init = () => {
  initNav();
  const initialRoute = window.location.hash.substring(1) || 'home';
  navigate(initialRoute);
  initFooter();
};

init();
