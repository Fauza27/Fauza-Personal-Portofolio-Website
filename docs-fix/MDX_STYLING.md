# 🎨 MDX Content Styling Guide

Dokumentasi custom MDX components untuk tampilan content yang profesional dan menarik.

---

## ✨ **Custom MDX Components**

### **Typography**

#### **Headings**
- **H1**: 4xl-5xl, bold, 6-8 spacing
- **H2**: 3xl-4xl, bold, border-bottom, section divider
- **H3**: 2xl-3xl, bold, subsection
- **H4**: xl-2xl, semibold, minor heading

#### **Paragraphs**
- Base-lg size untuk readability
- `leading-relaxed` untuk comfortable reading
- `text-muted-foreground` untuk hierarchy

#### **Lists**
- **Custom bullets**: Primary color arrow (▸)
- **Proper spacing**: 2-3 gap between items
- **Indentation**: Clean, aligned

### **Code Blocks**

#### **Inline Code**
```tsx
<code className="px-2 py-1 bg-white/5 text-primary rounded">
  inline code
</code>
```
- Primary color text
- Glass background
- Border untuk definition

#### **Code Blocks**
```tsx
<pre className="glass rounded-xl p-4 sm:p-6">
  <code>block code</code>
</pre>
```
- Glass morphism background
- Proper padding
- Overflow handling
- Syntax highlighting ready

### **Special Elements**

#### **Blockquotes**
- Left border (4px primary)
- Glass background
- Rounded corners
- Italic text
- Proper padding

#### **Links**
- Primary color
- Underline offset
- Hover effects
- External link handling (target="_blank")

#### **Tables**
- Glass background
- Hover row effects
- Proper borders
- Responsive overflow

#### **Images**
- Rounded corners
- Glass border
- Caption support
- Responsive width

---

## 🎯 **Design Principles**

### **1. Visual Hierarchy**
```
H1 (Hero) → H2 (Sections) → H3 (Subsections) → H4 (Details) → P (Content)
```

### **2. Spacing System**
- **Headings**: mt-8 (first: mt-0), mb-4-6
- **Paragraphs**: mb-4
- **Lists**: mb-6, space-y-2
- **Code blocks**: mb-6
- **Sections**: my-8

### **3. Color System**
- **Foreground**: Main text (white/98%)
- **Muted**: Secondary text (60% opacity)
- **Primary**: Accent color (purple)
- **Glass**: Backgrounds (5-10% white)

### **4. Typography Scale**
```
H1: 4xl-5xl (36-48px)
H2: 3xl-4xl (30-36px)
H3: 2xl-3xl (24-30px)
H4: xl-2xl (20-24px)
P:  base-lg (16-18px)
```

---

## 📝 **Content Guidelines**

### **Project Pages**

#### **Structure**
1. **Header Section**
   - Category badge
   - Year
   - Featured indicator
   - Title (3xl-5xl)
   - Description (lg-xl)
   - Tech stack pills
   - Action buttons (GitHub, Demo)

2. **Content Section**
   - Overview
   - Key features (H2)
   - Technical details (H3)
   - Code examples
   - Results/Impact

3. **Footer Section**
   - CTA ("Interested in This Project?")
   - Contact button

#### **Best Practices**
- Start with overview
- Use H2 for major sections
- Include code examples
- Show metrics/results
- End with CTA

### **Blog Pages**

#### **Structure**
1. **Header Section**
   - Meta info (date, time, author)
   - Title (3xl-6xl)
   - Excerpt (lg-xl)
   - Tags
   - Share button

2. **Content Section**
   - Introduction
   - Main content (H2 sections)
   - Code examples
   - Images/diagrams
   - Conclusion

3. **Footer Sections**
   - Author bio
   - CTA ("Found This Helpful?")
   - Contact button

#### **Best Practices**
- Hook readers with excerpt
- Use H2 for main points
- Include practical examples
- Add code snippets
- End with author bio + CTA

---

## 🎨 **Styling Examples**

### **Headers with Gradient Background**
```tsx
<div className="glass rounded-3xl p-12 relative overflow-hidden">
  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 opacity-20" />
  <div className="relative z-10">
    <h1>Title</h1>
    <p>Description</p>
  </div>
</div>
```

### **Section Dividers**
```tsx
<h2 className="border-b border-white/10 pb-2">
  Section Title
</h2>
```

### **Highlighted Text**
```tsx
<strong className="text-foreground">Important</strong>
<code className="text-primary">code</code>
```

### **Lists with Custom Bullets**
```tsx
<li className="flex items-start gap-3">
  <span className="text-primary">▸</span>
  <span>List item</span>
</li>
```

---

## 📊 **Component Breakdown**

### **MDXComponents.tsx**

```typescript
export const MDXComponents = {
  // Typography
  h1, h2, h3, h4,
  p, strong, em,
  
  // Lists
  ul, ol, li,
  
  // Code
  code, pre,
  
  // Special
  blockquote, hr,
  a, img,
  
  // Tables
  table, thead, tbody,
  tr, th, td,
};
```

### **Usage in Pages**

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';

<MDXRemote 
  source={content} 
  components={MDXComponents} 
/>
```

---

## 🎯 **Why This Matters**

### **For Readers**
- ✅ Easy to scan
- ✅ Comfortable reading
- ✅ Clear hierarchy
- ✅ Professional look

### **For Recruiters**
- ✅ Shows attention to detail
- ✅ Demonstrates design skills
- ✅ Professional presentation
- ✅ Easy to evaluate content

### **For SEO**
- ✅ Proper heading structure
- ✅ Semantic HTML
- ✅ Readable content
- ✅ Good UX signals

---

## 🚀 **Writing MDX Content**

### **Template: Project**

```mdx
---
title: "Project Title"
category: "Category"
description: "Short description"
tech: ["Tech1", "Tech2"]
gradient: "from-color-500/20 to-color-500/20"
year: "2024"
github: "https://github.com/..."
demo: "https://demo.com"
---

## Overview

Brief introduction to the project.

## Key Features

### Feature 1
Description of feature 1.

### Feature 2
Description of feature 2.

## Technical Implementation

```python
# Code example
def example():
    return "Hello"
```

## Results

- Metric 1
- Metric 2
- Metric 3
```

### **Template: Blog Post**

```mdx
---
title: "Post Title"
excerpt: "Short excerpt"
date: "2024-01-01"
author: "Your Name"
category: "Category"
tags: ["tag1", "tag2"]
readTime: "5 min read"
---

## Introduction

Hook the reader with an interesting opening.

## Main Point 1

Detailed explanation with examples.

```typescript
// Code example
const example = () => {
  return "Hello";
};
```

## Main Point 2

More content...

## Conclusion

Wrap up with key takeaways.
```

---

## ✅ **Checklist**

When creating MDX content:

- [ ] Use proper heading hierarchy (H1 → H2 → H3)
- [ ] Include code examples where relevant
- [ ] Add metrics/results for projects
- [ ] Use lists for scannable content
- [ ] Include images with captions
- [ ] End with clear CTA
- [ ] Proofread for typos
- [ ] Test on mobile
- [ ] Check all links work
- [ ] Verify code syntax highlighting

---

## 🎨 **Visual Examples**

### **Before (Plain MDX)**
```
# Title
Some text here.
- Item 1
- Item 2
```

### **After (Styled MDX)**
```
[Large, bold title with proper spacing]
[Readable paragraph with muted color]
▸ [Item 1 with custom bullet]
▸ [Item 2 with custom bullet]
```

---

## 📚 **Resources**

- [MDX Documentation](https://mdxjs.com/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)

---

*Last Updated: February 1, 2026*
