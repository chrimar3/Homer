# Homer Jewelry - Production Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Deploy to Vercel
```bash
# Deploy with Vercel CLI
vercel

# Or push to GitHub and connect to Vercel
git remote add origin https://github.com/YOUR_USERNAME/homer-jewelry.git
git push -u origin master
```

### Step 2: Set Up Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run `/supabase/schema.sql`
4. Copy your project URL and anon key from Settings > API

### Step 3: Set Up Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from Dashboard
3. Set up webhook endpoint for `/api/webhook/stripe`
4. Configure webhook to listen for `checkout.session.completed`

### Step 4: Environment Variables in Vercel
Go to your Vercel project settings and add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 5: Optional Services

#### Email (Resend)
```bash
npm install resend
```
Add to environment variables:
```env
RESEND_API_KEY=re_xxx
```

#### Analytics (Google)
Add to `app/layout.tsx`:
```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
```

#### Image CDN (Cloudinary)
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name and API keys
3. Update image URLs in your products

## 📦 Manual Deployment Steps

### 1. Build Locally
```bash
npm run build
npm start # Test production build
```

### 2. Database Setup
```bash
# Connect to Supabase and run migrations
npx supabase db push
```

### 3. Seed Initial Data
Create `/supabase/seed.sql` with your product data and run in Supabase SQL editor.

### 4. Domain Configuration
1. Add custom domain in Vercel
2. Update DNS records
3. SSL certificate auto-provisioned

## ✅ Production Checklist

### Before Launch
- [ ] All environment variables set
- [ ] Database schema created
- [ ] Stripe webhooks configured
- [ ] Email service connected
- [ ] Analytics installed
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] SEO meta tags updated
- [ ] Sitemap generated
- [ ] Robots.txt configured

### After Launch
- [ ] Test checkout flow
- [ ] Test booking system
- [ ] Test contact forms
- [ ] Monitor error logs
- [ ] Check page load speeds
- [ ] Verify mobile responsiveness
- [ ] Test email notifications
- [ ] Monitor analytics

## 🔧 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Database Connection Issues**
- Check Supabase URL and keys
- Verify RLS policies
- Check network restrictions

**Stripe Checkout Not Working**
- Verify API keys
- Check webhook configuration
- Ensure proper error handling

**Images Not Loading**
- Check Cloudinary configuration
- Verify image URLs
- Check CORS settings

## 📊 Monitoring

### Recommended Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking
- **Plausible**: Privacy-focused analytics
- **Better Uptime**: Uptime monitoring

### Key Metrics to Track
- Page load time (<2s target)
- Conversion rate (>2% target)
- Cart abandonment rate
- Booking completion rate
- Error rate (<1%)

## 🔄 Continuous Deployment

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## 📝 Post-Launch Tasks

1. **Week 1**
   - Monitor performance metrics
   - Fix any critical bugs
   - Gather user feedback

2. **Week 2**
   - Optimize based on analytics
   - A/B test key pages
   - Improve conversion funnel

3. **Month 1**
   - Add new features based on feedback
   - Expand product catalog
   - Launch marketing campaigns

## 🆘 Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Stripe: [stripe.com/docs](https://stripe.com/docs)

---

**Ready to Deploy?** Follow the steps above and your Homer jewelry site will be live in production within 30 minutes!