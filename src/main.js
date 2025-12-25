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
  blog: renderBlog,
  contact: renderContact
};


// Expose navigate to global scope
window.navigate = function (route) {
  window.location.hash = route;
  const renderFunc = routes[route] || renderHome;
  renderFunc();
  window.scrollTo(0, 0);
  initReveal();
  updateActiveLink(route);
}

function navigate(route) {
  window.navigate(route);
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
      <li><a href="#blog">Blog</a></li>
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
        <p>${content.profile.role}</p>
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
            <h2 style="font-size: 3rem; margin-bottom: 20px;">The Voice of <span style="color: var(--accent-gold)">Modern Media</span>.</h2>
            <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 1.2rem;">
              ${content.profile.bio.split('\n\n')[0]}
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
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                  ${content.focusAreas.map(area => `<span style="background: rgba(212, 175, 55, 0.1); padding: 5px 10px; border-radius: 15px; font-size: 0.9rem; color: var(--accent-gold);">${area}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
          <div class="reveal">
            <h2 style="font-size: 2.5rem; margin-bottom: 30px;">More than just a writer, I am a <span style="color: var(--accent-gold)">storyteller</span>.</h2>
            <div style="color: var(--text-secondary); font-size: 1.1rem; display: grid; gap: 20px;">
              ${content.profile.bio.split('\n\n').map(p => `<p>${p}</p>`).join('')}
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
          A collection of my best work across various categories.
        </p>
        
        ${[...new Set(content.articles.map(a => a.category))].map(category => `
          <div class="reveal" style="margin-bottom: 80px;">
            <h3 style="font-size: 2rem; margin-bottom: 30px; border-left: 3px solid var(--accent-gold); padding-left: 20px;">${category}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
              ${content.articles.filter(a => a.category === category).map(article => `
                <a href="${article.link}" target="_blank" class="portfolio-card glass" style="display: block; overflow: hidden; transition: transform 0.3s ease;">
                  <div style="height: 200px; overflow: hidden; position: relative;">
                    <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; color: var(--accent-gold);">
                       Read Article
                    </div>
                  </div>
                  <div style="padding: 25px;">
                    <h4 style="margin: 0 0 10px 0; font-size: 1.3rem; line-height: 1.4;">${article.title}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0;">${article.excerpt}</p>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

async function renderBlog() {
  mainContent.innerHTML = `
    <section class="section" style="padding-top: 150px;">
      <div class="container">
        <h1 class="reveal" style="font-size: 4rem; margin-bottom: 20px; text-align: center;">The <span style="color: var(--accent-gold)">Blog</span></h1>
        <p class="reveal" style="text-align: center; color: var(--text-secondary); margin-bottom: 60px; max-width: 600px; margin-inline: auto;">
          Thoughts, stories, and insights.
        </p>
        <div id="blog-grid" style="display: grid; gap: 40px; max-width: 800px; margin: 0 auto;">
           <div class="glass" style="padding: 40px; text-align: center;">Loading posts...</div>
        </div>
      </div>
    </section>
  `;

  try {
    const response = await fetch('/blog.json');
    const posts = await response.json();
    // The CMS saves the list under a key called "posts" if using the file collection approach defined in config.yml (name: "posts" inside the file)
    // However, the JSON structure depends on how we initialized it. 
    // If I initialized it as a raw array (checked step 1), I should read it as such.
    // WAIT: Decap CMS with a 'file' collection usually expects an object structure if specific fields are defined, BUT with a list widget at the top level?
    // Let's adjust the fetch logic to handle both array or object wrapper.
    const blogPosts = Array.isArray(posts) ? posts : (posts.posts || []);

    const blogGrid = document.getElementById('blog-grid');
    if (blogPosts.length === 0) {
      blogGrid.innerHTML = '<div class="glass" style="padding: 40px; text-align: center;">No posts found.</div>';
      return;
    }

    blogGrid.innerHTML = blogPosts.map(post => `
       <article class="glass reveal" style="padding: 40px;">
          <span style="color: var(--accent-gold); font-size: 0.9rem;">${post.date}</span>
          <h3 style="font-size: 2rem; margin: 10px 0 20px 0;">${post.title}</h3>
          <p style="color: var(--text-secondary); margin-bottom: 30px;">${post.excerpt}</p>
          <button class="cta-button" style="padding: 10px 25px; font-size: 0.9rem;" onclick="alert('Full blog view implementation coming soon!')">Read More</button>
       </article>
    `).join('');

    // Re-init reveal because new content was added
    initReveal();

  } catch (error) {
    console.error("Failed to load blog:", error);
    document.getElementById('blog-grid').innerHTML = '<div class="glass" style="padding: 40px; text-align: center;">Failed to load posts.</div>';
  }
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
                 <p><a href="mailto:${content.contact.email}">${content.contact.email}</a></p>
              </div>
              <div class="glass" style="padding: 30px; margin-bottom: 20px;">
                 <h4 style="color: var(--accent-gold); margin-bottom: 10px;">WhatsApp</h4>
                 <p><a href="https://wa.me/${content.contact.whatsapp.replace('+', '')}" target="_blank">${content.contact.whatsapp}</a></p>
              </div>
              <div class="glass" style="padding: 30px; margin-bottom: 20px;">
                 <h4 style="color: var(--accent-gold); margin-bottom: 10px;">Location</h4>
                 <p>${content.profile.location}</p>
              </div>
              <div class="social-links" style="display: flex; gap: 15px; margin-top: 30px;">
                <a href="${content.contact.instagram}" target="_blank" class="glass" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">IG</a>
                <a href="${content.contact.linkedin}" target="_blank" class="glass" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">In</a>
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
        <p style="font-size: 0.9rem; color: var(--text-secondary);">© 2025 Gloria Adesanya. All rights reserved.</p>
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
