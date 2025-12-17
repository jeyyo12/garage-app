# 📦 Garage Management System - Refactored

## 🎯 Overview
A professional garage/stock management system with client tracking, work history, and payment management. Fully refactored with separated HTML, CSS, and JavaScript for better maintainability and organization.

## 📁 File Structure

```
c:\Users\Ailen\Desktop\New folder\
├── index.html          # HTML markup (semantic, clean structure)
├── styles.css          # All CSS styling (responsive, organized)
├── app.js              # All JavaScript logic (modular functions)
├── index-old.html      # Backup of previous all-in-one version
└── README.md          # This file
```

## 🚀 Features

### 📊 Three Main Sections (Tabbed Interface)

#### 1. **Stock Tab** 📦
- View all products with images and animated borders
- **Tap to decrement** stock in real-time
- Search products by name or ID
- Track sales in last 12 hours
- View revenue today (GBP)
- Countdown timer to midnight reset
- Add/update stock quantities
- Undo last action

#### 2. **Clients Tab** 👥
- Add new clients (name, phone, car model)
- **Search clients** by name, car, or phone
- **Sort by spending** (highest spenders first)
- View client work history
- Track payments and balances
- Open detailed client modal for full management
- Total debt calculation

#### 3. **Analytics Tab** 📊
- Real-time statistics dashboard
- Top products sold today
- Top clients by spending
- Active clients count
- Total debt overview

### ✨ Client Management Modal
- **Add work entries** with descriptions, parts used, costs
- **Record payments** and track payment history
- View total owed vs. remaining balance
- Mark client as paid (archives them)
- Delete work entries or entire client
- Visual cost breakdown

## 🎨 Design Improvements

### Better UX/UI
- **Tab navigation** - Easy switching between sections
- **Cleaner forms** - Organized with better labeling
- **Card layouts** - Client and product cards for better scanning
- **Mobile responsive** - Works perfectly on all devices
- **Consistent styling** - Professional appearance with accent colors
- **Animations** - Smooth transitions and hover effects

### Organization
- **Semantic HTML** - Proper structure, easier to maintain
- **Modular CSS** - Grouped by sections (navigation, forms, modals, etc.)
- **Well-commented JS** - Functions grouped by feature area
- **Constants at top** - Easy to configure
- **DOM caching** - Selectors cached for performance

## 💾 Data Persistence

All data is stored in browser's **localStorage**:
- `stockLogsV1` - Sales logs (12h window)
- `stockItemsV1` - Current stock state
- `lastResetTime` - Midnight reset tracking
- `clientsV2` - Active clients
- `paidClientsV2` - Archived paid clients

Data persists across:
- ✅ Page refreshes
- ✅ Browser restarts
- ✅ Multiple tabs (real-time sync)

## 🔧 How to Use

1. **Open `index.html`** in any modern browser
2. **Stock Management:**
   - Tap product images to sell (-1 stock)
   - Click "+ Add Stock" to add quantities
   - Use search to find products
   - Undo mistakes with "Undo" button

3. **Client Management:**
   - Switch to "Clients" tab
   - Add clients with form
   - Search/filter clients
   - Click a client card to open details
   - Add work and record payments

4. **View Analytics:**
   - Switch to "Analytics" tab
   - See real-time sales data
   - Top products and clients

## 📱 Mobile Optimized

- **Responsive grid layout** - Adapts to all screen sizes
- **Fixed stats bar** - Quick stats always visible on mobile
- **Touch-friendly** - Large tap targets
- **Tab navigation** - Mobile-friendly tab switching
- **Forms optimized** - Single column on mobile

## 🌍 Localization

- 🇷🇴 **Fully Romanian UI** - All labels and messages
- 🇬🇧 **GBP currency** - All amounts in British Pounds (£)
- 📅 **Date format** - Romanian (DD.MM.YYYY)

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, animations
- **Vanilla JavaScript** - No dependencies
- **LocalStorage API** - Client-side persistence
- **Google Fonts** - Space Grotesk font

## 📊 Key Functions

### Stock Functions
- `render()` - Render all products
- `onTap(id, evt)` - Handle product tap
- `undoLastAction()` - Reverse last sale
- `countLast12h()` - Count sales in 12h
- `revenueToday()` - Calculate today's revenue

### Client Functions
- `addClient(name, phone, car)` - Create new client
- `addWork(clientId, desc, parts, workPrice, partsPrice)` - Add work entry
- `addPayment(clientId, amount)` - Record payment
- `renderClientsList(searchTerm)` - Display clients with search/sort
- `markClientAsPaid(clientId)` - Archive paid clients

### UI Functions
- `switchTab(tabName)` - Navigate between tabs
- `updateAnalytics()` - Refresh analytics dashboard
- `toggleStockModal(show)` - Open/close stock modal
- `toggleClientModal(show)` - Open/close client details

## 🎯 Recent Improvements

✅ **Separated into 3 files** - Better organization
✅ **Tab-based navigation** - Cleaner interface
✅ **Improved layout** - More intuitive flow
✅ **Better forms** - Organized inputs
✅ **Analytics dashboard** - Data visualization
✅ **Client search & sort** - Find clients by spending
✅ **Responsive design** - Works on all devices
✅ **Modal improvements** - Larger, better organized
✅ **Consistent styling** - Professional appearance

## 🔒 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- **No external dependencies** - Everything is vanilla JavaScript
- **All data is local** - Nothing sent to servers
- **60-day log retention** - Logs older than 60 days auto-deleted
- **Real-time sync** - Multiple tabs stay in sync via storage events
- **Midnight auto-reset** - Sales data resets at 00:00 automatically

## 🚀 Future Enhancements

- Export data to CSV/PDF
- Cloud backup option
- Advanced filtering/reporting
- Client communication feature
- Invoice generation
- Automated payment reminders

---

Made with ❤️ for efficient garage management
