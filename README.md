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

## TODOs

| Item                                                         | Person          | Done               |
| ------------------------------------------------------------ | --------------- | ------------------ |
| **Complete basic (no Alpine) "New listing" desktop UI as per Figma.** <br />Use `<input type="submit">` for the "post listing" button. | Koh Hau         |                    |
| **Complete `handleProductImagesChange(event)` for "New listing" page.**<br />Push generated object URLs into `productImageLocalURLs`. Upload images to Supabase and push paths to `productImageStoragePaths` | Haziq           | :white_check_mark: |
| **Connect "New listing" UI to JS via Alpine.**<br />Use `<form x-data="newListing" @submit="createListing">`, with `@change="handleThumbnailChange"` and `@change="handleProductImagesChange"` (implemented in script.js) on the relevant input elements. | Haziq / Koh Hau |                    |
| **Implement `smallnav` CSS class used by "New listing" and "Your listings" pages.**<br />Use flexbox. | Haziq           | :white_check_mark: |
| **Complete basic "Your listings" desktop UI as per Figma.**  | Koh Hau         |                    |
| **Implement Alpine data component `"listings"` for "Your listings" page.**<br />Select all listings belonging to the current user. | Haziq           |                    |
| **Connect "Your listings" UI to JS via Alpine.**<br />Use `<template x-data="listings" x-for="l in listings">`, and `x-text="..."` where needed, to generate UI based on the data from the database. See the bottom of `/index.html` for reference. | Koh Hau         |                    |
| **Implement Alpine data component for listing page.**<br />Select one row from the `listings` table. | Haziq           |                    |
| **Make "New listing" page responsive for mobile.**           | Koh Hau         |                    |
| **Scaffold HTML structure & CSS layouts for listing page.**  | Haziq           |                    |
| **Complete basic desktop UI for listing page.**              | Koh Hau         |                    |
| **Connect listing page UI to JS via Alpine.**                | Haziq           |                    |
| **Make listing page responsive for mobile.**                 | Koh Hau         |                    |

