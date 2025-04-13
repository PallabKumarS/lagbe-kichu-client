# Lagbe Kichu - Frontend

This project is the frontend for Lagbe Kichu, built using Next.js with
TypeScript. It provides role-based dashboards for buyers, sellers, and admins,
along with product listing management and order tracking.

## Live URL

[Deployed Frontend](https://pks-lagbe-kichu-client.vercel.app)

## Repository

[GitHub Repository](https://github.com/PallabKumarS/lagbe-kichu-client)

## Installation

To install dependencies, run:

```bash
bun install
```

## Running the Project

To start the development server:

```bash
bun run dev
```

To build the project:

```bash
bun run build
```

To start the production server:

```bash
bun run start
```

## Project Structure

- `/listings` - View all property listings
- `/listings/[listingId]` - View details of a specific listing
- `/dashboard` - Role-based dashboard
  - `/dashboard/profile` - User profile
  - `/dashboard/settings` - Account settings
  - `/dashboard/admin/user-management` - Admin user management
  - `/dashboard/admin/listing-management` - Admin listing management
  - `/dashboard/admin/category-management` - Admin category management
  - `/dashboard/buyer/orders` - Tenant request tracking
  - `/dashboard/seller/orders` - Landlord request tracking
  - `/dashboard/seller/listings` - Landlord create and manage listings
- `/terms` - Terms & Conditions
- `/privacy` - Privacy Policy
- `/about` - About Us

## Environment Variables

Create a `.env.local` file and add the following variables:

```env
NEXT_PUBLIC_API_URL="your api url"
```

## Dependencies

- **Next.js** (15.2.0)
- **TypeScript** (5.x)
- **React** (19.x)
- **Redux Toolkit**
- **React Hook Form**
- **Zod** (for validation)
- **Tailwind CSS**
- **Framer Motion**

## Development Tools

- ESLint
- Tailwind CSS
- Radix UI Components
