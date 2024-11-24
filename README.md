# NotaBox - Smart Note Management System

NotaBox is a modern, AI-powered note management system designed to help teams organize and access their knowledge base efficiently. Built with Next.js 14, TypeScript, and Supabase, it offers a seamless experience for managing documents, notes, and media files.

![NotaBox Screenshot](https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=2000)

## Features

- 🔍 Smart Search with real-time suggestions
- 📝 Rich text editing with markdown support
- 🏷️ Custom fields and tagging system
- 🔐 Secure authentication with multiple providers
- 📱 Responsive design for all devices
- 🌙 Dark mode support
- 🚀 Optimized performance

## Quick Start

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/notabox.git
cd notabox
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Development

### Project Structure

```
notabox/
├── app/                # Next.js 14 app directory
├── components/         # Reusable React components
├── lib/               # Utility functions and hooks
├── styles/            # Global styles and CSS modules
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Deployment

### Docker Deployment

1. Build the Docker image:
```bash
docker-compose build
```

2. Start the container:
```bash
docker-compose up -d
```

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

For security concerns, please email security@notabox.com

## Support

For support questions, join our [Discord community](https://discord.gg/notabox)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.