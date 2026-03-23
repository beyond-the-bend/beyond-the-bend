# Beyond the Bend GoHighLevel Audit Worksheet

## Purpose

This worksheet is the practical follow-up to the GoHighLevel dependency checklist.

It is meant to be used during a real GoHighLevel review session so we can record:

- what is confirmed active
- what can be replaced
- what should stay temporarily
- what can be retired

## Decision Labels

Use one of these labels for each item:

- Keep for now
- Replace before migration
- Replace after migration
- Retire
- Unknown

## Section 1. Known Dependencies Already Found Locally

These are items already confirmed from the local workspace.

| Area | Item | Evidence | Current Decision | Notes |
| --- | --- | --- | --- | --- |
| Public classes | Studio class payment links | `classes.html` contains GoHighLevel widget form links for payment and e-transfer | Unknown | Needs replacement plan |
| Livestream | Livestream payment links | `livestream.html` contains GoHighLevel widget form links for online payment and e-transfer | Unknown | Needs replacement plan |
| Membership | Sanctuary product structure | Strategy docs reference a GoHighLevel membership product called `The Sanctuary` | Unknown | Need live confirmation in GHL |
| Courses | `A Quiet Return` | User confirmed it exists in GoHighLevel | Unknown | Need lesson and asset inventory |
| Operations | Video upload workflow | Internal SOPs instruct uploading finished videos into GHL membership area | Unknown | SOPs will need updating later |
| CRM | Contacts and tags | Local `ghl-mcp` tooling supports contacts, tags, conversations, and email functions | Unknown | Need to confirm what is actively used |
| Media | Hosted images | Local website pages still use `images.leadconnectorhq.com` assets | Unknown | May be okay short-term, but should be inventoried |
| Pricing/content logic | Custom values and scripts | Local scripts reference GHL custom values, prices, and checkout links | Unknown | Need to know what is live versus experimental |

## Section 2. Public Website Audit

### Pages To Check

| Page / Area | What To Confirm In GoHighLevel | Current Decision | Notes |
| --- | --- | --- | --- |
| Home | Are any buttons, forms, or signup actions powered by GHL? | Unknown |  |
| About | Are there any embedded forms or hidden automation hooks? | Unknown |  |
| Studio Classes | What forms, payment links, and automations are attached? | Unknown |  |
| Live Stream | What forms, payment links, and automations are attached? | Unknown |  |
| Workshops and Programs | What registrations or payments run through GHL? | Unknown |  |
| Contact | Is the contact form powered by GHL? | Unknown |  |
| Newsletter signup | Is signup captured and automated inside GHL? | Unknown |  |

## Section 3. Forms Audit

| Form Name | Purpose | Triggers Automation? | Current Platform | Current Decision | Notes |
| --- | --- | --- | --- | --- | --- |
| Studio class e-transfer form | Class registration | Unknown | Likely GHL | Unknown |  |
| Studio class card payment form | Class registration/payment | Unknown | Likely GHL | Unknown |  |
| Livestream payment forms | Registration/payment | Unknown | Likely GHL | Unknown |  |
| Contact form | Inquiry capture | Unknown | Unknown | Unknown |  |
| Newsletter signup form | Email capture | Unknown | Unknown | Unknown |  |
| Workshop forms | Event registration | Unknown | Unknown | Unknown |  |

## Section 4. Payments and Offers Audit

| Offer / Product | Current Platform | Active? | Replacement Urgency | Current Decision | Notes |
| --- | --- | --- | --- | --- | --- |
| Studio class payment | Likely GHL | Unknown | High | Unknown |  |
| Livestream class payment | Likely GHL | Unknown | High | Unknown |  |
| Sanctuary membership payment | Likely GHL | Unknown | High | Unknown |  |
| `A Quiet Return` course payment | Likely GHL | Unknown | High | Unknown |  |
| 8-week course payment | Unknown | Unknown | Medium | Unknown |  |
| Workshop payment flows | Unknown | Unknown | High | Unknown |  |

## Section 5. Membership Audit

| Membership Item | What To Confirm | Current Decision | Notes |
| --- | --- | --- | --- |
| Sanctuary product exists | Is it live, draft, or inactive? | Unknown |  |
| Categories | What categories already exist inside the membership? | Unknown |  |
| Lessons | What lessons are already uploaded? | Unknown |  |
| Offers | What offers grant access to Sanctuary? | Unknown |  |
| Access logic | How is access granted and revoked? | Unknown |  |
| Login flow | How do members actually sign in? | Unknown |  |

## Section 6. Courses Audit

| Course | What To Confirm | Current Decision | Notes |
| --- | --- | --- | --- |
| `A Quiet Return` | Lessons, media, PDFs, automations, checkout, sales page | Unknown |  |
| 8-week course | Existing assets, draft structure, checkout setup, emails | Unknown |  |
| Other hidden or draft courses | Any unpublished products or offers | Unknown |  |

## Section 7. Automations Audit

| Automation Type | Example | Current Decision | Notes |
| --- | --- | --- | --- |
| Registration confirmations | Student signs up and receives confirmation | Unknown |  |
| Payment confirmations | Student pays and gets receipt/instructions | Unknown |  |
| Reminder emails | Before class or workshop | Unknown |  |
| Membership onboarding | Welcome and access emails | Unknown |  |
| Course drip emails | Scheduled lesson delivery | Unknown |  |
| Newsletter automation | Signup to list/tag/sequence | Unknown |  |
| Failed payment or cancellation | Access/payment handling | Unknown |  |

## Section 8. CRM Audit

| CRM Area | What To Confirm | Current Decision | Notes |
| --- | --- | --- | --- |
| Contacts | Are contacts actively managed in GHL? | Unknown |  |
| Tags | Which tags matter operationally? | Unknown |  |
| Segments/lists | What segments are actively used? | Unknown |  |
| Conversations | Is message history important to preserve? | Unknown |  |
| Pipelines | Are any pipelines used in day-to-day business? | Unknown |  |

## Section 9. Media and Asset Audit

| Asset Type | What To Confirm | Current Decision | Notes |
| --- | --- | --- | --- |
| Website images | Which images are still hosted through GHL-related URLs? | Unknown |  |
| Course assets | Which media files only live in GHL? | Unknown |  |
| Membership thumbnails | Which visual assets were uploaded directly into GHL? | Unknown |  |
| PDFs and downloads | Which downloads are hosted only in GHL? | Unknown |  |

## Section 10. Operational Workflow Audit

| Workflow | Current GHL Role | Current Decision | Notes |
| --- | --- | --- | --- |
| Video upload workflow | Final videos uploaded to GHL membership area | Unknown |  |
| Weekly maintenance | GHL maintenance appears in operations docs | Unknown |  |
| VA instructions | SOPs mention GHL as active system | Unknown |  |

## Section 11. Suggested Audit Order

To keep this calm and efficient, review in this order:

1. Studio classes and livestream payment links
2. Contact and newsletter forms
3. Sanctuary product, offers, and access
4. `A Quiet Return`
5. 8-week course
6. Automations
7. CRM and tags
8. Image and asset hosting

## Section 12. Working Goal

By the end of this audit, we want to know:

- what absolutely must stay in GoHighLevel for now
- what can be rebuilt first
- what can be ignored until later
- what the safest first migration wave should include
