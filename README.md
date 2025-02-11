# MokeSell

This is a simple e-commerce website for a front-end development assignment. Users of the site (at [haziq21.github.io/FED_MokeSell_website](https://haziq21.github.io/FED_MokeSell_website/)) are either prospective buyers looking to purchase second-hand goods, or prospective sellers looking to make money by selling their used items.

## Implemented features

1. **User account management**
   Users can create accounts and log in to the platform.
2. **Creating listings**
   Users can upload product information (name, description, category, photos) to create publicly-viewable listings.
3. **Browsing listings**
   Users (logged-in or not) can view every active listing from any user.

## Planned features

1. **Updating account information**
   Logged-in users should be able to update their profile information.
2. **Advanced listing management**
   Sellers should have a maximum of 30 active listings at a time, and listings should automatically become inactive after 30 days. Sellers should be able to promote (bump) their listings by purchasing different types of bumps to increase visibility.
3. **Searching listings**
   Users should be able to search for specific listings using keywords, as well as browse listings by category / sub-category.
4. **Communication and transactions**
   Prospective buyers should be able to start a chat with sellers to discuss transaction details. Buyers and sellers should be able to post reviews and rate each other after completing transactions.

## Development

**Technologies:** This project uses [Supabase](https://supabase.com/) for its PostgreSQL database and storage buckets, and [AlpineJS](https://alpinejs.dev/) as a minimal front-end framework.

**Directory structure:** All pages follow the directory structure `/path/index.html`, with page-specific CSS and JS in `/path/styles.css` and `/path/script.js`. Shared CSS and JS are in `/shared/`.

**Conventions:** Where it helps, CSS is organised with [BEM](https://getbem.com/introduction/). [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are used to organise JS.
