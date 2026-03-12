# Beyond the Bend (BTB) - Operations & Handover Plan

Hey there! As discussed, here is the master plan for the tech stack and backend operations of Beyond the Bend Yoga (BTB). 

Since you are taking over the heavy lifting of the systems and tech, this document breaks down the immediate priorities, secondary goals, and what currently exists in this `C:\BTB` folder so your AI agent has full context.

## What is in the `C:\BTB` folder?
Everything related to the business strategy and brand voice lives in this folder. When you set up your AI workspace, pointing it here will instantly give your agent context on the brand. 

Key files for your AI to read first:
- `\Logos\BTB Brand Voice (1).md` - This is critical. It outlines the exact tone, target audience (50+ demographic), and the soul of the BTB brand.
- `\Business_Strategy\business_snapshot.md` - High-level overview of the business goals.
- `\Business_Strategy\VA Brand & Operations Guide.md` - Detailed operations and brand parameters.
- `\Business_Strategy\SANCTUARY_SUSTAINABLE_ROADMAP.md` - A strategic roadmap previously drafted for the business.

## 🚀 Phase 1: High Priority (Immediate Action Items)
These are the most pressing tasks to get the foundation built and ready for content.

1. **Pick the Website Look & Platform**
   - We need to confirm the design language and final website platform (moving away from GoHighLevel eventually, but getting a solid landing page/site structure set up now).
   - *Goal:* Determine platform (e.g. WordPress, Squarespace, or a custom build) and set up the overarching website structure.
2. **Platform Strategy: WordPress + GoHighLevel (For Now)**
   - *The Website & Sanctuary:* I want to avoid expensive all-in-one platforms like Kajabi. Since you have Antigravity, we can build a stellar custom WordPress site for the main website, Sanctuary, and Hub. This gives us beautiful design and total control without the massive monthly fees of Kajabi.
   - *The CRM (GoHighLevel):* I am paid up on GoHighLevel until November. Since I already have my contacts, tags, email templates, and workflows in there, it makes the most sense to keep using GHL for email marketing and backend automations for the time being. We can just connect GHL to the new WordPress site. 
   - *Goal:* Let me know if you agree with this hybrid approach (WordPress for the site/courses, GHL for the emails/workflows until November) as the best path forward.
3. **Payment Systems & Stripe Migration**
   - *Current Setup:* I use **Stripe** for all my sales (classes, passes, etc.). Everything I sell goes through Stripe. I avoid PayPal for sales due to past negative experiences.
   - *Affiliate Payouts:* Most affiliate companies (like those in Refersion/Scoria) pay out via **PayPal**, so I maintain an account solely for receiving those commissions.
   - *Goal:* When we move to WordPress, we need to migrate the Stripe API connections from GoHighLevel to the new site so I can keep taking payments without interruption.

---
## 🤖 The Automated Video Pipeline (Remotion + Auto-Editor)
I have built a foundational "Video Factory" in `c:\BTB\Remotion-Video-Processor`. This replaces the old FFmpeg script with a professional-grade, code-based video builder.

**The Current Workflow:**
1.  **Descript (Manual, ~5 mins):** Laura opens raw footage in Descript, clicks "Studio Sound" and "Remove Filler Words," then exports a "Clean Voice" file.
2.  **The Drop:** Laura places the "Clean Voice" file into the `raw_footage` folder.
3.  **The Automation (Zero-Touch):** Laura runs the script. 
    *   **Auto-Editor (CLI):** Automatically hunts down long, empty pauses on the mat and trims them (e.g., shortening a 10s pause to 3s).
    *   **Video Wrapper (FFmpeg/Remotion):** Wraps the shortened video by smoothly crossfading Laura's pre-made Canva designs (Intro and Outro) into the class video. Do not use generic code-generated assets; ensure the warmth of the brand is preserved through her custom Canva clips.

**Future Upgrade Path (Keep an Eye Out):**
*   *Descript API Limitations:* Currently, Descript's API does not allow external bots (like me) to automatically click "Studio Sound" or "Remove Filler Words" because those actions use paid AI credits.
*   *The Watchlist:* Since AI is moving incredibly fast, Descript will likely open up these endpoints soon. **I will keep an eye on their API updates**. As soon as they allow automated "Studio Sound" and "Filler Word Removal", we will completely eliminate the manual Descript step.
---

4. **Set up "The Sanctuary" (The Core Offer)**
   - Build the container/membership area for the courses and meditations on the new site.
   - We need a space where classes and resources can be easily dropped in without friction.

5. **Set up "The Hub"**
   - Build the community/centralized hub where members interact and all the resources live.

## ⏳ Phase 2: Medium Priority (Can wait a bit)
Once the foundation is built and there's a place to store everything, we can move on to content processing.

1. **Video Editing Workflow**
   - You offered to help with video editing! This is amazing, but can wait until the foundation is built. 
   - There are existing SOPs in the `\Business_Strategy` folder about how the videos have historically been processed (`VA Video Processing SOP.md` and `VIDEO_WORKFLOW_GUIDE.md`).
2. **Building the Courses**
   - I will be working on building the courses little by little. As I film and complete them, I will drop them into our shared drives for you to upload into the platform/Sanctuary.
3. **Meditations**
   - I am going to keep recording new meditations. These will also be dripped into the shared drive for uploading once the Hub/Sanctuary is ready.
4. **Email Marketing / Newsletters**
   - There is a `\newsletters` folder with past content. Eventually, we'll need a streamlined automated newsletter system once the new site is live. 

## 📝 Next Steps for You
1. Connect your AI agent to this folder so it learns the brand voice.
2. Review the `Phase 1` priorities and let me know your thoughts on the best platform to build the new website and Hub/Sanctuary.
3. I will go through and pick my favorite website aesthetics to share with you!
