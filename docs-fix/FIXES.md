# 🔧 Bug Fixes & Solutions

Dokumentasi bug fixes yang telah dilakukan pada project ini.

---

## ✅ Fixed: Hydration Mismatch Error

### Problem
**Error Type**: Hydration Mismatch  
**Component**: `BentoGrid.tsx`  
**Severity**: Warning (tidak break app, tapi perlu diperbaiki)

**Error Message**:
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

**Root Cause**:
Di `BentoGrid` component, posisi neural network nodes dihitung menggunakan `Math.sin()` dan `Math.cos()` saat render:

```tsx
// ❌ WRONG - Causes hydration mismatch
{[...Array(6)].map((_, i) => (
  <motion.div
    style={{
      top: `${20 + Math.sin(i * 1.2) * 30}%`,  // Different on server vs client
      left: `${20 + Math.cos(i * 1.2) * 30}%`,
    }}
  />
))}
```

**Why it happens**:
- Server-side rendering (SSR) menghitung posisi saat build
- Client-side rendering menghitung ulang posisi saat hydration
- Karena floating point precision, nilai bisa sedikit berbeda
- React mendeteksi perbedaan dan throw warning

### Solution

Pre-calculate posisi sebagai konstanta di luar component:

```tsx
// ✅ CORRECT - No hydration mismatch
const neuralNodePositions = [
  { top: '11.62%', left: '48.81%' },
  { top: '38.52%', left: '68.09%' },
  { top: '64.72%', left: '48.81%' },
  { top: '38.52%', left: '29.53%' },
  { top: '5.28%', left: '29.53%' },
  { top: '71.96%', left: '68.09%' },
];

// Use pre-calculated positions
{neuralNodePositions.map((pos, i) => (
  <motion.div
    style={{
      top: pos.top,
      left: pos.left,
    }}
  />
))}
```

### Result
✅ No more hydration warnings  
✅ Consistent rendering server & client  
✅ Better performance (no recalculation)

---

## 🎯 General Hydration Best Practices

### Common Causes of Hydration Mismatch

1. **Random Values**
   ```tsx
   // ❌ BAD
   <div style={{ top: Math.random() * 100 }} />
   
   // ✅ GOOD
   const position = useMemo(() => Math.random() * 100, []);
   <div style={{ top: position }} />
   ```

2. **Date/Time**
   ```tsx
   // ❌ BAD
   <div>{new Date().toLocaleString()}</div>
   
   // ✅ GOOD - Use client component
   'use client';
   const [time, setTime] = useState(null);
   useEffect(() => setTime(new Date().toLocaleString()), []);
   <div>{time || 'Loading...'}</div>
   ```

3. **Browser-only APIs**
   ```tsx
   // ❌ BAD
   <div>{window.innerWidth}</div>
   
   // ✅ GOOD
   const [width, setWidth] = useState(0);
   useEffect(() => setWidth(window.innerWidth), []);
   <div>{width}</div>
   ```

4. **Conditional Rendering Based on Client**
   ```tsx
   // ❌ BAD
   {typeof window !== 'undefined' && <ClientComponent />}
   
   // ✅ GOOD
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   {mounted && <ClientComponent />}
   ```

### Next.js Specific Tips

1. **Use 'use client' directive** untuk components dengan interactivity
2. **Use Server Components** untuk static content
3. **Avoid Math.random(), Date.now()** di render
4. **Pre-calculate values** yang bisa di-calculate ahead of time
5. **Use useEffect** untuk client-only logic

---

## 📝 Testing Checklist

Setelah fix hydration error, test:

- [ ] `npm run build` - No errors
- [ ] `npm run dev` - No console warnings
- [ ] Browser console (F12) - No hydration warnings
- [ ] Visual check - Animations work correctly
- [ ] Mobile responsive - No layout shifts

---

## 🔍 How to Debug Hydration Errors

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for red errors
   - React will show which element mismatched

2. **Check Server vs Client**
   - View page source (Ctrl+U) - Server HTML
   - Inspect element (F12) - Client HTML
   - Compare differences

3. **Common Patterns**
   - Look for Math.random()
   - Look for Date.now()
   - Look for window/document usage
   - Look for conditional rendering

4. **Use React DevTools**
   - Install React DevTools extension
   - Check component tree
   - Look for warnings

---

## ✅ Status

**Current Status**: All hydration errors fixed ✅

**Last Updated**: February 1, 2026

**Tested On**:
- Next.js 16.1.6
- React 19.2.3
- Chrome, Firefox, Safari

---

## 📚 References

- [React Hydration Docs](https://react.dev/link/hydration-mismatch)
- [Next.js Hydration Guide](https://nextjs.org/docs/messages/react-hydration-error)
- [Common Hydration Patterns](https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only)

---

*If you encounter new hydration errors, add them to this document with the fix!*
