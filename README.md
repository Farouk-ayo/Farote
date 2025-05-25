# 📝Farote Notes App

A modern, responsive note-taking application built with Next.js, featuring a clean interface and seamless user experience across all devices.

## ✨ Features

- **Create & Edit Notes**: Intuitive note creation and editing interface
- **Delete Confirmation**: Safe deletion with confirmation dialogs
- **View Full Content**: Expandable note viewer for long content
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Instant feedback on all CRUD operations
- **Date Tracking**: Automatic creation and update timestamps
- **Modern UI**: Clean, accessible interface with smooth animations

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Radix UI Icons](https://icons.radix-ui.com/)
- **Date Formatting**: [date-fns](https://date-fns.org/)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Farouk-ayo/farote.git
   cd farote
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Optional: Other environment variables
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Creating a Note

<!-- 1. Click the "Add Note" or "+" button -->

2. Enter your note title and content
3. Save to create the note

### Viewing Notes

- Browse all notes in the main dashboard
- Click "View Full" to see complete note content in a modal
- Notes display creation/update timestamps

### Editing Notes

1. Click "Edit" on any note card
2. Modify the title or content
3. Save changes to update the note

### Deleting Notes

1. Click "Delete" on any note card
2. Confirm deletion in the popup dialog
3. Note will be permanently removed

## 🎨 UI/UX Features

### Responsive Design

- **Mobile**: Full-screen modals with touch-friendly buttons
- **Tablet**: Optimized layout for medium screens
- **Desktop**: Traditional modal dialogs with hover effects

### Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatible
- Focus management in modals

### Animations

- Smooth transitions and hover effects
- Modal entry/exit animations
- Loading states for better UX

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── NoteCard.tsx
│   ├── NoteForm.tsx
│   └── ui/
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts
└── public/
    └── icons/
```

## 🔧 Configuration

### Tailwind CSS

The app uses Tailwind CSS for styling. Configuration can be found in:

- `tailwind.config.js`
- `app/globals.css`

### TypeScript

Type definitions are located in:

- `types/index.ts` - Main app types
- Individual component files for component-specific types

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Ensure responsive design works on all devices
- Add proper error handling
- Include tests for new features

## 📝 API Routes (if applicable)

```
GET    /api/notes       - Get all notes
POST   /api/notes       - Create new note
PUT    /api/notes/:id   - Update note
DELETE /api/notes/:id   - Delete note
```

## 🐛 Known Issues

- [ ] None currently reported

## 📈 Roadmap

- [ ] **Search Functionality**: Add note search and filtering
- [ ] **Categories/Tags**: Organize notes with categories
- [ ] **Rich Text Editor**: Enhanced text formatting options
- [ ] **Dark Mode**: Theme switching capability
- [ ] **Export Notes**: PDF/Markdown export functionality
- [ ] **Collaboration**: Share notes with other users
- [ ] **Offline Support**: PWA with offline capabilities
- [ ] **Voice Notes**: Audio recording and transcription

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/Farouk-ayo)
- Email: mustaphafarouk41@gmail.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/Faroukayo)

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for seamless deployment

---

## 📸 Screenshots

### Desktop View

![Desktop Screenshot](./screenshots/desktop.png)

### Mobile View

![Mobile Screenshot](./screenshots/mobile.png)

### Note Editor

![Editor Screenshot](./screenshots/editor.png)

---

**Made with ❤️ and Next.js**
