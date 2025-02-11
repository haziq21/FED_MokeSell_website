# MokeSell

This is a simple e-commerce website for a front-end development assignment.

## Planned features

1. **User account management**
   Users can create accounts and log in to the platform. Logged-in users can update their profile information.
2. **Listing management**
   Sellers can create listings by selecting categories, uploading photos, and providing product details. Sellers can have a maximum of 30 active listings at a time, and listings automatically become inactive after 30 days. Sellers can promote (bump) their listings by purchasing different types of bumps to increase visibility.
3. **Search and browsing**
   Users (logged-in or not) can search for specific items using keywords. They can browse listings by category / sub-category. They can save listings for later viewing by liking them.
4. **Communication and transactions**
   Prospective buyers can start a chat with sellers to discuss transaction details. Buyers can submit an offer price through the system. Buyers and sellers can post reviews and rate each other after completing transactions.

## Development

**Technologies:** This project uses [Supabase](https://supabase.com/) for its PostgreSQL database and storage buckets, and [AlpineJS](https://alpinejs.dev/) as a minimal front-end framework.

**Directory structure:** All pages follow the directory structure `/path/index.html`, with page-specific CSS and JS in `/path/styles.css` and `/path/script.js`. Shared CSS and JS are in `/shared/`.

**Conventions:** Where it helps, CSS is organised with [BEM](https://getbem.com/introduction/). [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are used to organise JS.
