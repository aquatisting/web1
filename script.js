document.addEventListener('DOMContentLoaded', function() {
    const pageContent = document.querySelector('.page-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLink = document.querySelector('.home-link');
    const aboutLink = document.querySelector('.about-link');
    const servicesLink = document.querySelector('.services-link');
    const imageWrapper = document.querySelector('.image-wrapper');
    const cameraImage = document.querySelector('.camera-image');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const blogLink = document.querySelector('.blog-link');
    const images = [
        './images/camera.png', 
        './images/camera1.jpg', 
        './images/camera2.jpg',
    ];
    let currentImageIndex = 0;

    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateY(20px)';
        
        
        requestAnimationFrame(() => {
            pageContent.classList.add('fade-in');
            pageContent.style.opacity = '';
            pageContent.style.transform = '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && !href.startsWith('#')) {
                
                sessionStorage.setItem('navigatingTo', href);
                
             
                if (pageContent) {
                    pageContent.classList.remove('fade-in');
                    pageContent.classList.add('fade-out');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                } else {
                    window.location.href = href;
                }
            }
        });
    });
    window.addEventListener('popstate', function() {
        if (pageContent) {
            pageContent.classList.remove('fade-in');
            pageContent.classList.add('fade-out');
            
            setTimeout(() => {
                window.location = document.location;
            }, 300);
        }
    });
    const navigatingFrom = sessionStorage.getItem('navigatingTo');
    if (navigatingFrom) {
        sessionStorage.removeItem('navigatingTo');
        if (pageContent) {
            pageContent.classList.add('fade-in');
        }
    }
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            homeLink?.classList.add('active');
        } else if (currentPath.endsWith('about-me.html')) {
            aboutLink?.classList.add('active');
        } else if (currentPath.endsWith('services.html')) {
            servicesLink?.classList.add('active');
        } else if (currentPath.endsWith('my-blog.html')) {
            blogLink?.classList.add('active');
        }
    }
    setActiveLink();

    function changeImage(direction) {
        if (!cameraImage) return;
        
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        
        cameraImage.style.opacity = '0';
        setTimeout(() => {
            cameraImage.src = images[currentImageIndex];
            cameraImage.style.opacity = '1';
        }, 300);
        cameraImage.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400';
            this.onerror = null;
        };
    }
    if (leftArrow) {
        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            changeImage(-1);
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            changeImage(1);
        });
    }

    if (imageWrapper) {
        imageWrapper.addEventListener('click', () => changeImage(1));
    }
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const newsletterForm = document.querySelector('.signup-form');

    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
               
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                button.classList.add('active');

                const category = button.textContent.toLowerCase();
                
                blogPosts.forEach(post => {
                    const postCategory = post.querySelector('.post-category')
                        ?.textContent.toLowerCase();
                    
                    if (category === 'all' || postCategory?.includes(category)) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        post.style.opacity = '0';
                        post.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button');
            
            if (emailInput.value) {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitButton.style.backgroundColor = '#4CAF50';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.innerHTML = 'Subscribe <i class="far fa-paper-plane"></i>';
                    submitButton.style.backgroundColor = '';
                }, 2000);
            }
        });
    }
    const cursor = document.createElement('div');
    cursor.classList.add('retro-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });
    });
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
          
            this.style.filter = 'brightness(1.5) hue-rotate(15deg)';
            this.style.transform = 'scale(0.95) translateY(2px)';
            
        
            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA');
            audio.volume = 0.1;
            audio.play().catch(() => {});
            
            setTimeout(() => {
                this.style.filter = '';
                this.style.transform = '';
                window.location = this.href;
            }, 200);
        });
    });
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            document.body.style.setProperty(
                '--scroll',
                window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)
            );
        });
    });

    function handleImageError(img) {
        img.onerror = null;
        img.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
        img.classList.add('image-error');
    }

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });

 
    document.querySelectorAll('.post-card').forEach(card => {
        card.style.willChange = 'transform, opacity';
    });

    return () => {
        if (cursor) {
            cursor.remove();
        }
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
    };
});

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

document.querySelectorAll('.post-image img').forEach(img => {
    imageObserver.observe(img);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const postObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('post-visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.post-card').forEach(post => {
    postObserver.observe(post);
});


document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.filter = 'brightness(1.5)';
        setTimeout(() => {
            this.style.filter = '';
            window.location = this.href;
        }, 200);
    });
});


document.querySelectorAll('.post-category').forEach(category => {
    category.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
        this.style.filter = 'hue-rotate(10deg) brightness(1.1)';
    });
    category.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.filter = 'none';
    });
    category.addEventListener('click', function(e) {
        this.style.transform = 'translateY(2px)';
        setTimeout(() => {
            this.style.transform = 'translateY(0)';
        }, 150);
    });
});