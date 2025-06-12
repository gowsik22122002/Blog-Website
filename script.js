document.addEventListener("DOMContentLoaded", function() {
  console.log("Photography Blog loaded successfully!");

  // Handle comment submission
  const commentForms = document.querySelectorAll('.comment-form');
  
  commentForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = this.querySelector('input[type="text"]');
      const commentInput = this.querySelector('textarea');
      
      if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
        alert('Please fill in all fields');
        return;
      }
      
      // Create new comment element
      const commentsSection = this.closest('.comments-section');
      const newComment = document.createElement('div');
      newComment.className = 'comment';
      
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      newComment.innerHTML = `
        <div class="comment-author">
          <strong>${nameInput.value}</strong> - <span class="comment-date">${dateString}</span>
        </div>
        <div class="comment-content">
          <p>${commentInput.value}</p>
        </div>
      `;
      
      // Insert new comment before the form
      commentsSection.insertBefore(newComment, this);
      
      // Clear form
      nameInput.value = '';
      commentInput.value = '';
      
      // Show success message
      const successMsg = document.createElement('p');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Comment posted successfully!';
      this.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      performSearch();
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
      alert('Please enter a search term');
      return;
    }
    
    // In a real application, this would search through your content
    // For now, we'll just show an alert
    alert(`Searching for: ${searchTerm}\nThis would search through blog posts in a real implementation.`);
    
    // You could implement actual search by:
    // 1. Filtering cards on the index page
    // 2. Making an AJAX request to a server
    // 3. Redirecting to a search results page
  }
  
  // Social sharing buttons
  const socialButtons = document.querySelectorAll('.social-icon');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const platform = this.textContent.toLowerCase();
      
      // Get current page URL and title
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl;
      
      switch(platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'pinterest':
          const image = encodeURIComponent(document.querySelector('.post-image').src);
          shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
          break;
        default:
          return;
      }
      
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  });
});
