// ===== Mobile Navigation Menu ===== 

 

const menuToggle = document.getElementById("menu-toggle"); 

const navigation = document.getElementById("main-navigation"); 

 

if (menuToggle && navigation) { 

    menuToggle.addEventListener("click", function () { 

 

        navigation.classList.toggle("active"); 

 

        const isOpen = navigation.classList.contains("active"); 

 

        menuToggle.setAttribute("aria-expanded", isOpen); 

 

        menuToggle.setAttribute( 

            "aria-label", 

            isOpen ? "Close navigation menu" : "Open navigation menu" 

        ); 

 

        menuToggle.textContent = isOpen ? "✕" : "☰"; 

 

    }); 

}

// ===== Enquiry Form Functionality ===== 

 

const enquiryForm = document.getElementById("enquiry-form"); 

 

if (enquiryForm) { 

 

    enquiryForm.addEventListener("submit", function (event) { 

 

        // Prevent normal form submission 

        event.preventDefault(); 

 

        // Check HTML form validation 

        if (!enquiryForm.checkValidity()) { 

            enquiryForm.reportValidity(); 

            return; 

        } 

 

        // Get form information 

        const customerName = document.getElementById("name").value.trim(); 

 

        const enquiryType = document.getElementById("enquiry").value; 

 

        const selectedItem = document.getElementById("menu-item").value; 

 

        const quantity = Number(document.getElementById("quantity").value); 

 

        const response = document.getElementById("enquiry-response"); 

 

        // Check whether an order enquiry has a menu item 

        if (enquiryType === "order" && selectedItem === "") { 

 

            response.textContent = 

                "Please select a menu item before submitting your order enquiry."; 

            response.className = "form-response error"; 

            document.getElementById("menu-item").focus(); 

            return; 

        } 

 

        // Check quantity 

        if (enquiryType === "order" && 

            (!Number.isInteger(quantity) || quantity < 1 || quantity > 50)) { 

 

            response.textContent = 

                "Please enter a quantity between 1 and 50."; 
            response.className = "form-response error"; 
            return; 

        } 

        // Menu item prices 

        const menuPrices = { 

            "Cappuccino": 28, 

            "Latte": 30, 

            "Americano": 25, 

            "Espresso": 25, 

            "Mocha": 35, 

            "Hot Chocolate": 36, 

            "Tea": 20, 

            "Breakfast": 120, 

            "Sandwich": 45, 

            "Panini": 50, 

            "Wrap": 46, 

            "Salad": 50, 

            "Muffin": 20, 

            "Croissant": 30, 

            "Pastry": 28, 

            "Cake": 40 

 

        }; 
        // Display an appropriate response 

        if (enquiryType === "order") { 
            const price = menuPrices[selectedItem]; 
            const total = price * quantity; 
            response.textContent = 

                "Thank you, " + customerName + 

                "! Your enquiry for " + quantity + 

                " " + selectedItem + 

                "(s) has been received. The estimated cost is R" + 

                total + ". Please contact our team to confirm availability and your order."; 

        } else { 

            response.textContent = 

                "Thank you, " + customerName + 

                "! Your enquiry has been received. Our friendly team will assist you with your request. Please contact us if you need further assistance."; 

        } 

        // Display success message 

        response.className = "form-response success"; 

        // Clear the form after successful processing 

        enquiryForm.reset(); 

    }); 

    // Clear response when the form is reset 

    enquiryForm.addEventListener("reset", function () { 

 

        const response = document.getElementById("enquiry-response"); 

 

        response.textContent = ""; 

 

        response.className = "form-response"; 

    }); 

}

// ===== Contact Form Validation ===== 

 

const contactForm = document.getElementById("contact-form"); 

 

if (contactForm) { 

 

    contactForm.addEventListener("submit", function (event) { 

 

        // Prevent normal form submission 

        event.preventDefault(); 

 

        // Check form validation 

        if (!contactForm.checkValidity()) { 

 

            contactForm.reportValidity(); 

 

            return; 

        } 

 

        // Get customer information 

        const name = document.getElementById("contact-name").value.trim(); 

 

        const email = document.getElementById("contact-email").value.trim(); 

 

        const phone = document.getElementById("contact-phone").value.trim(); 

 

        const messageType = document.getElementById("message-type").value; 

 

        const message = document.getElementById("contact-message").value.trim(); 

 

        const response = document.getElementById("contact-response"); 

 

        // Check message length 

        if (message.length < 10) { 

 

            response.textContent = 

                "Please enter a message containing at least 10 characters."; 

 

            response.className = "form-response error"; 

 

            return; 

        } 

        // Prepare email information 

        const recipient = "nellamagadu30@gmail.com"; 

        const subject = encodeURIComponent( 

            messageType + " - Lee's Coffee Shop" 

        ); 

        const body = encodeURIComponent( 

            "Customer Name: " + name + "\n" + 

            "Email Address: " + email + "\n" + 

            "Phone Number: " + (phone || "Not provided") + "\n" + 

            "Message Type: " + messageType + "\n\n" + 

            "Message:\n" + message 

        ); 

        // Prepare email link 

        const emailLink = 

            "mailto:" + recipient + 

            "?subject=" + subject + 

            "&body=" + body; 

        // Display response 

        response.textContent = 

            "Your message has been validated. Your email application will now open so you can review and send your message."; 

        response.className = "form-response success"; 

        // Open the customer's default email application 

        window.location.href = emailLink; 

    }); 

    // Clear response when form is reset 

    contactForm.addEventListener("reset", function () { 

        const response = document.getElementById("contact-response"); 

        response.textContent = ""; 

        response.className = "form-response"; 

    }); 

} 

// ===== MENU SEARCH, FILTER AND SORT ===== 

 

const menuSearch = document.getElementById("menu-search"); 

const menuFilter = document.getElementById("menu-filter"); 

const menuSort = document.getElementById("menu-sort"); 

const menuGrid = document.getElementById("menu-grid"); 

const noResults = document.getElementById("no-results"); 

 

if (menuSearch && menuFilter && menuSort && menuGrid) { 

 

    function updateMenu() { 

 

        const searchText = menuSearch.value.toLowerCase(); 

        const selectedCategory = menuFilter.value; 

        const selectedSort = menuSort.value; 

 

        const menuItems = Array.from( 

            menuGrid.querySelectorAll(".menu-item") 

        ); 

 

        // Search and filter menu items 

        menuItems.forEach(function(item) { 

 

            const itemName = item.textContent.toLowerCase(); 

            const itemCategory = item.dataset.category; 

 

            const matchesSearch = itemName.includes(searchText); 

 

            const matchesCategory = 

                selectedCategory === "all" || 

                itemCategory === selectedCategory; 

 

            item.style.display = 

                matchesSearch && matchesCategory ? "" : "none"; 

 

        }); 

 

        // Sort menu items 

        const sortedItems = [...menuItems]; 

 

        if (selectedSort === "low-high") { 

            sortedItems.sort((a, b) => 

                Number(a.dataset.price) - Number(b.dataset.price) 

            ); 

        } 

 

        else if (selectedSort === "high-low") { 

            sortedItems.sort((a, b) => 

                Number(b.dataset.price) - Number(a.dataset.price) 

            ); 

        } 

 

        else if (selectedSort === "name") { 

            sortedItems.sort((a, b) => 

                a.querySelector("h3").textContent.localeCompare( 

                    b.querySelector("h3").textContent 

                ) 

            ); 

        } 

 

        // Reorganise the menu on the page 

        sortedItems.forEach(function(item) { 

            menuGrid.appendChild(item); 

        }); 

 

        // Display message when no items match 

        const visibleItems = sortedItems.filter(function(item) { 

            return item.style.display !== "none"; 

        }); 

 

        if (noResults) { 

            noResults.hidden = visibleItems.length > 0; 

        } 

    } 

 

    menuSearch.addEventListener("input", updateMenu); 

    menuFilter.addEventListener("change", updateMenu); 

    menuSort.addEventListener("change", updateMenu); 

 

    updateMenu(); 

} 

// IMAGE GALLERY AND LIGHTBOX 

 

const galleryImages = document.querySelectorAll(".gallery-image"); 

 

const lightbox = document.getElementById("lightbox"); 

const lightboxImage = document.getElementById("lightbox-image"); 

const lightboxCaption = document.getElementById("lightbox-caption"); 

 

const closeLightbox = document.getElementById("close-lightbox"); 

const previousImage = document.getElementById("previous-image"); 

const nextImage = document.getElementById("next-image"); 

 

let currentImageIndex = 0; 

 

function showGalleryImage(index) { 

 

    if (!galleryImages.length || !lightboxImage) { 

        return; 

    } 

 

    currentImageIndex = 

        (index + galleryImages.length) % galleryImages.length; 

 

    const selectedImage = galleryImages[currentImageIndex]; 

 

    lightboxImage.src = selectedImage.src; 

    lightboxImage.alt = selectedImage.alt; 

 

    lightboxCaption.textContent = selectedImage.alt; 

} 

 

function openLightbox(index) { 

 

    if (!lightbox) { 

        return; 

    } 

 

    showGalleryImage(index); 

    lightbox.classList.add("active"); 

    document.body.style.overflow = "hidden"; 

 

} 

 

function closeGallery() { 

 

    if (!lightbox) { 

        return; 

    } 

 

    lightbox.classList.remove("active"); 

    document.body.style.overflow = ""; 

 

} 

 

galleryImages.forEach(function(image, index) { 

 

    image.addEventListener("click", function() { 

        openLightbox(index); 

    }); 

 

}); 

 

if (closeLightbox) { 

    closeLightbox.addEventListener("click", closeGallery); 

} 

 

if (nextImage) { 

    nextImage.addEventListener("click", function() { 

        showGalleryImage(currentImageIndex + 1); 

    }); 

} 

 

if (previousImage) { 

    previousImage.addEventListener("click", function() { 

        showGalleryImage(currentImageIndex - 1); 

    }); 

} 

 

// Close when clicking outside the picture 

if (lightbox) { 

    lightbox.addEventListener("click", function(event) { 

        if (event.target === lightbox) { 

            closeGallery(); 

        } 

    }); 

} 

 

// Close using the Escape key 

document.addEventListener("keydown", function(event) { 

 

    if (!lightbox || !lightbox.classList.contains("active")) { 

        return; 

    } 

 

    if (event.key === "Escape") { 

        closeGallery(); 

    } 

 

    if (event.key === "ArrowRight") { 

        showGalleryImage(currentImageIndex + 1); 

    } 

 

    if (event.key === "ArrowLeft") { 

        showGalleryImage(currentImageIndex - 1); 

    } 

 

}); 

// ACCORDION FUNCTIONALITY 

const accordionButtons = document.querySelectorAll(".accordion-button"); 

 

accordionButtons.forEach(function(button) { 

    button.addEventListener("click", function() { 

        const accordionItem = button.parentElement; 

        accordionItem.classList.toggle("active"); 

 

        const symbol = button.querySelector("span"); 

 

        if (symbol) { 

            symbol.textContent = accordionItem.classList.contains("active") 

                ? "-" 

                : "+"; 

        } 

    }); 

}); 

 

 

// TABS FUNCTIONALITY 

const tabButtons = document.querySelectorAll(".tab-button"); 

const tabContents = document.querySelectorAll(".tab-content"); 

 

tabButtons.forEach(function(button) { 

    button.addEventListener("click", function() { 

        const selectedTab = button.dataset.tab; 

 

        tabButtons.forEach(function(tab) { 

            tab.classList.remove("active"); 

        }); 

 

        tabContents.forEach(function(content) { 

            content.classList.remove("active"); 

        }); 

 

        button.classList.add("active"); 

 

        const selectedContent = document.getElementById(selectedTab); 

 

        if (selectedContent) { 

            selectedContent.classList.add("active"); 

        } 

    }); 

}); 