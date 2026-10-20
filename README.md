# Sakthi Dental Clinic Website

A modern, premium, fully responsive, and accessible healthcare website for **Sakthi Dental Clinic**, located in Hosur, Tamil Nadu, India.

---

## 🏥 Clinic Information

- **Name:** Sakthi Dental Clinic
- **Headline:** Specialized Dental Care for Women, Children & Families
- **Founder:** Dr. Anupriya
- **Address:** B2/8, SBM Layout, Anthivadi, Hosur, Tamil Nadu 635109, India
- **Email:** [info@sakthidentalclinic.in](mailto:info@sakthidentalclinic.in)
- **Phone:** [+91 9862890897](tel:+919862890897) | [+91 9363298118](tel:+919363298118)
- **Consulting Timings:** 9:00 AM – 7:00 PM, Sunday to Saturday (Open 7 Days a week)

---

## 📁 Project Structure

```
sakthi-dental-clinic/
├── index.html            # Home page (Hero, Welcome Banner, Why Choose Us, 6 Featured Treatments, Facilities, Testimonials, CTA, Contact snippet)
├── about.html            # About Us page (Dr. Anupriya bio, Clinic philosophy, 4-step sterilization protocol)
├── treatments.html       # Treatments page (All 12 treatments detailed with procedures, candidates, and care)
├── faqs.html             # FAQs page (Categorized accessible accordion for appointments, pediatric care, safety)
├── contact.html          # Contact Us page (Address, phone, email, working hours, interactive appointment form, Google Maps)
├── privacy-policy.html   # Privacy Policy page (Healthcare patient data privacy and confidentiality)
├── style.css             # Unified CSS design system (tokens, components, responsive layout, accessibility)
├── script.js             # Shared JavaScript (responsive navigation, accessible accordion, client validation, WhatsApp dispatch)
└── README.md             # Project documentation & deployment guide
```

---

## 🎨 Design System & Palette

- **Base Background:** Pure White (`#FFFFFF`) with subtle soft grey-blue cards (`#F8FAFC`)
- **Soft Lavender:** Primary accent (`#7C3AED` / `#EDE9FE`) — represents gentle, calming clinical care
- **Pastel Pink:** Accent (`#EC4899` / `#FCE7F3`) — highlights women's and pediatric dental warmth
- **Clinical Blue:** Trust accent (`#2563EB` / `#EFF6FF`) — reflects hygiene, precision, and healthcare trust
- **Typography:** Google Font `Plus Jakarta Sans` with fluid responsive scaling

---

## 💻 How to Run Locally

Because this project is built entirely with clean vanilla **HTML5**, **CSS3**, and **Vanilla JavaScript**, it requires **zero build steps or installations**.

### Option 1: Direct Browser Launch
1. Open the project folder in File Explorer:
   `C:\Users\sezan khan\.gemini\antigravity\scratch\sakthi-dental-clinic`
2. Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Using VS Code Live Server
1. Open the folder `sakthi-dental-clinic` in VS Code or Antigravity IDE.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. The site will launch automatically at `http://localhost:5500`.

---

## 🚀 Checklist for Deploying to Netlify

### Step 1: Prepare the Folder
- Ensure all 6 HTML files, `style.css`, and `script.js` are in the root directory (as organized).
- Relative paths (`href="about.html"`, `src="script.js"`) are already configured.

### Step 2: Deploy via Netlify Drop (Fastest - 1 Minute)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and log in.
2. Drag and drop the `sakthi-dental-clinic` folder directly into the Netlify Drop area.
3. Netlify will immediately upload and provide a live URL (e.g. `https://sakthi-dental-clinic.netlify.app`).

### Step 3: Deploy via Git Repository (Recommended for Continuous Updates)
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Sakthi Dental Clinic website"
   ```
2. Push to GitHub, GitLab, or Bitbucket.
3. In Netlify, click **"Add new site" > "Import an existing project"**, and choose your repository.
4. Leave the build command empty and set publish directory to `.` (root).

### Step 4: Configure Netlify Forms (Optional Backend Delivery)
- The appointment form already has `data-netlify="true"` and `name="appointment-inquiry"`.
- Netlify will automatically detect the form.
- In **Site Settings > Forms**, add notification email `info@sakthidentalclinic.in` to receive incoming bookings directly to your inbox!

### Step 5: Custom Domain & Free SSL
1. In Netlify, go to **Domain management > Add custom domain**.
2. Enter `sakthidentalclinic.in` or `www.sakthidentalclinic.in`.
3. Point your DNS records (A record / CNAME) as instructed by Netlify.
4. Netlify will automatically provision a free Let's Encrypt SSL certificate (HTTPS).
