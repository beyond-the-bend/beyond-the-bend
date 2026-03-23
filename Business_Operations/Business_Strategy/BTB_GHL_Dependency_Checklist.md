# Beyond the Bend GoHighLevel Dependency Checklist

## Purpose

This document lists the business functions that still appear to depend on GoHighLevel.

The goal is simple:

- identify what must be replaced
- identify what can stay temporarily
- reduce the risk of forgetting an important backend piece during migration

## How To Use This Checklist

For each item below, the eventual decision should be one of:

- Keep in GoHighLevel for now
- Replace before migration
- Replace after migration
- No longer needed

## 1. Public Website Dependencies

### Studio and Livestream Registration Links

Status:

- Confirmed GoHighLevel dependency

Evidence:

- local website pages include `fromleadstosales.com` and `link.beyondthebendyoga.ca` form and checkout links

What To Check:

- every button for class registration
- every e-transfer form
- every online payment form
- any workshop signup links

Replacement Decision Needed:

- what system will handle public registrations and payments outside GoHighLevel

## 2. Forms

### Contact Forms

Status:

- Not yet fully confirmed in this review

What To Check:

- contact page form
- newsletter signup forms
- workshop inquiry forms
- affiliate interest forms if any

Key Question:

- which forms are simple data capture versus which ones trigger automations

### Payment Forms

Status:

- Confirmed GoHighLevel dependency

Evidence:

- local pages contain GoHighLevel widget form links for purchases and e-transfer flows

What To Check:

- all online payment forms
- all e-transfer forms
- all class pass forms
- workshop payment flows

## 3. Payments and Checkout

### Stripe-Connected Checkout

Status:

- Likely tied to GoHighLevel today

Evidence:

- local scripts reference GoHighLevel checkout and price links
- prior planning notes mention moving Stripe connections later

What To Check:

- every active product or price currently sold through GoHighLevel
- class passes
- workshop payments
- course purchases
- membership payments

Replacement Decision Needed:

- where checkout will live after migration

## 4. Membership Area

### Sanctuary Product

Status:

- Confirmed GoHighLevel dependency exists or existed

Evidence:

- strategy docs describe creating a GoHighLevel membership product called `The Sanctuary`
- operations documents refer to uploading finished videos into the GHL membership area

What To Check:

- whether Sanctuary is currently live in GoHighLevel
- which lessons are already uploaded there
- what categories already exist there
- what student access is currently active

### Member Access Logic

Status:

- Likely GoHighLevel-dependent

What To Check:

- how students sign in
- how access is granted
- whether access differs by offer or course
- whether there are magic links, passwords, or email-based entry

## 5. Courses

### A Quiet Return

Status:

- Confirmed to exist in GoHighLevel

What To Check:

- full lesson list
- videos
- audio files
- PDFs
- welcome emails
- sales page
- checkout flow

### 8-Week Course

Status:

- In development

What To Check:

- what exists locally already
- what exists only in GoHighLevel
- whether any draft sales or lesson structure already exists in GHL

### Other Courses or Products

Status:

- Unknown

What To Check:

- all current Products in GHL
- all Offers in GHL
- any unpublished or draft course containers

## 6. Offers and Pricing

### Membership Offers

Status:

- Likely GoHighLevel-dependent

What To Check:

- all active membership offers
- monthly pricing
- any free or founder access offers
- trial offers if any

### Course Offers

Status:

- Likely partly GoHighLevel-dependent

What To Check:

- course-specific prices
- bundle prices
- coupon or discount logic

## 7. Automations and Email Workflows

### Registration Automations

Status:

- Likely GoHighLevel-dependent

What To Check:

- confirmation emails
- reminder emails
- payment confirmation
- waitlist logic

### Membership and Course Automations

Status:

- Likely GoHighLevel-dependent

What To Check:

- welcome emails
- lesson drip emails
- access emails
- onboarding sequences
- cancellation or failed payment flows

### Newsletter and Contact Automations

Status:

- Unknown from this pass

What To Check:

- newsletter signup automation
- tagging logic
- list segmentation
- nurture sequences

## 8. CRM and Contact Management

### Contacts and Tags

Status:

- Strong sign of GoHighLevel dependency

Evidence:

- the workspace contains a `ghl-mcp` toolset and tests for contacts, tags, conversations, and email operations

What To Check:

- contact records
- tags
- segments
- pipelines if used
- conversation history if needed for the business

## 9. Blog or Content Publishing

Status:

- Possible GoHighLevel capability exists in the local toolset

Evidence:

- local GHL tools include blog-related API support

What To Check:

- whether the live blog or future blog content is actually tied to GHL
- whether this support was experimental or actively used

## 10. Media Hosting and Asset Links

Status:

- Some dependency likely exists

Evidence:

- local pages reference `images.leadconnectorhq.com`

What To Check:

- which images are still served from GoHighLevel-related hosting
- whether those images need to be migrated or can stay temporarily

## 11. Custom Values and Dynamic Content

Status:

- Confirmed technical dependency in tooling

Evidence:

- local scripts reference GoHighLevel custom values APIs

What To Check:

- what custom values currently exist in GHL
- which pages or emails depend on them
- whether pricing, dates, or links are injected dynamically

## 12. Operational Workflows Still Pointing to GoHighLevel

Status:

- Confirmed in internal docs

Evidence:

- VA and video workflow documents repeatedly instruct uploading content to GHL
- weekly operations reference GHL maintenance

What To Check:

- which staff or helpers are still using GHL as part of weekly operations
- what SOPs need to be rewritten after migration

## 13. Priority Order for Review

This is the recommended order for checking GoHighLevel:

1. Forms and payment links
2. Membership products and offers
3. Courses and course assets
4. Automations and email flows
5. Contacts, tags, and CRM use
6. Images, custom values, and secondary tools

## 14. Highest-Risk Dependencies

These are the items most likely to break the business if forgotten:

- payment links
- class registration forms
- membership access
- course access
- automations that send confirmations or onboarding
- Stripe-connected checkout logic

## 15. Suggested Next Working Session

The next best use of time is a guided GoHighLevel audit using this checklist.

That audit should answer:

- what is active right now
- what is important but replaceable later
- what must be rebuilt before migration
- what can be retired
