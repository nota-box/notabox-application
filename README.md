# NotaBox - Modern File Management System

NotaBox is a modern, feature-rich file management system built with React, TypeScript, and Firebase. It offers powerful search capabilities, real-time file management, and a beautiful user interface with dark mode support.

![NotaBox](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=400&q=80)

## Features

- 🔍 Advanced search with real-time suggestions
- 📁 Intuitive file management
- 🎨 Beautiful UI with light/dark mode
- 🔒 Secure authentication (Google, Apple, Guest)
- 📱 Responsive design
- 📄 Built-in documentation
- ⚙️ Comprehensive settings
- 🚀 Production-ready

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Firebase account (for authentication)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notabox.git
   cd notabox
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your Firebase configuration.

4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Required environment variables for production:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Development

### Project Structure

```
notabox/
├── src/
│   ├── components/     # React components
│   ├── stores/        # State management
│   ├── lib/           # Utilities and configurations
│   ├── types/         # TypeScript type definitions
│   └── App.tsx        # Root component
├── public/            # Static assets
└── ...config files
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Standard Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your hosting provider.

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t notabox .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 notabox
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.