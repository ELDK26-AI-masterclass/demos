---
name: threadly-faq
description: Threadly customer support FAQs and response guidelines. Load this skill when building or improving the customer support chat feature, generating FAQ content, or handling support-related prompts.
---

# Threadly – Customer Support FAQ

This skill is the source of truth for the customer support chat feature
(`src/features/support/`). The chat agent should ground all responses here
before calling Azure OpenAI.

---

## How the support chat works

1. User types a question in `<SupportChat />`
2. The front-end sends it to `src/features/support/supportAgent.ts`
3. The agent searches these FAQs using keyword matching
4. If a match is found → return the scripted answer (no AI call needed)
5. If no match → send to Azure OpenAI with the system prompt below as grounding

**Fallback system prompt** (for unmatched questions):

```
You are Threadly's friendly support assistant.
You only answer questions about Threadly products, orders, sizing, and returns.
If asked anything else, politely redirect to threadly.shop/contact.
Keep answers under 3 sentences. Tone: helpful and mildly witty.
```

---

## FAQ catalogue

### Orders & Shipping

**Q: How long does delivery take?**
A: UK orders arrive in 3–5 working days. EU is 5–10 days. Pick Express at checkout for next-day UK delivery.

**Q: Can I track my order?**
A: Yes — you'll get a tracking link by email once your order ships. It can take up to 24 h to activate.

**Q: Do you ship internationally?**
A: We ship to the UK, EU, and the US. Shipping costs are calculated at checkout.

---

### Returns & Refunds

**Q: What is your return policy?**
A: Unworn items can be returned within 30 days for a full refund. Sale items are final.

**Q: My tee arrived damaged — what do I do?**
A: Sorry about that! Email support@threadly.shop with a photo and your order number. We'll sort it within 48 h.

**Q: Can I exchange for a different size?**
A: Yes — return the original and place a new order. Exchanges are free for UK customers.

---

### Sizing

**Q: How do I know what size to order?**
A: Use the Size Recommendation tool on any product page — it asks for your chest measurement and fit preference and suggests the best size.

**Q: Do your tees run small?**
A: Our Minimalist range fits true to size. The Bold range runs slightly slim — we recommend sizing up if in doubt.

---

### Products

**Q: What are the tees made of?**
A: All Threadly tees are 100% GOTS-certified organic cotton, pre-shrunk, and printed with water-based inks.

**Q: Can I customise a tee with my own design?**
A: Not yet — but it's coming in a future release! Join the waitlist at threadly.shop/custom.

**Q: Do you restock sold-out items?**
A: Most designs are restocked within 2–4 weeks. Hit "Notify me" on the product page to get an alert.

---

### Technical / Website

**Q: The AI product description doesn't look right.**
A: Refresh the page — AI-generated content occasionally needs a retry. If the issue persists, use the "Not helpful?" button to flag it.

**Q: Can I save items for later?**
A: The cart persists across sessions in your browser. Account wishlists are planned for a future release.

---

## Topics to escalate (never answer via chat)

- Payment disputes or chargebacks → redirect to threadly.shop/contact
- Wholesale / bulk orders → redirect to wholesale@threadly.shop
- Press / media enquiries → redirect to press@threadly.shop