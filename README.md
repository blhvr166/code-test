# ER CareView Dashboard

## What is this project?

This is a modern web dashboard designed to help emergency room staff monitor patient wait times in real-time. Imagine you're working in a busy hospital ER and you need to quickly see how long patients have been waiting for different levels of care. This dashboard shows that information clearly and updates automatically every 30 seconds.

The dashboard displays wait times for three different priority levels:
- **Critical patients** (red) - need immediate attention
- **Urgent patients** (orange) - need care soon but can wait a bit
- **Standard patients** (blue) - routine care that can wait longer

## Why was this built?

Emergency rooms are high-pressure environments where every minute counts. Staff need to make quick decisions about patient care and resource allocation. This dashboard provides a clear, at-a-glance view of wait times to help prioritize care and manage the ER more effectively.

## Key Features

### Real-Time Updates
The dashboard automatically refreshes every 30 seconds to show the latest wait times. You don't need to manually refresh the page - it stays current automatically.

### Works on Any Device
Whether you're using a desktop computer, tablet, or phone, the dashboard adjusts to fit your screen perfectly. This means you can check wait times from anywhere in the hospital.

### Accessible to Everyone
The dashboard follows web accessibility guidelines (WCAG 2.1 AA) so it can be used by people with disabilities. This includes support for screen readers, keyboard navigation, and high contrast colors.

### Built for Reliability
The dashboard handles errors gracefully. If something goes wrong with the data, you'll see a clear message instead of a broken page. It also shows loading indicators while fetching new data.

## Technology Used

This project was built using modern web technologies:

- **Next.js 16** - A powerful framework for building web applications
- **React 19** - The latest version of React for building user interfaces
- **TypeScript** - Adds type safety to JavaScript to catch errors early
- **TanStack Query** - Handles data fetching and caching efficiently

## How to Run the Project

### Prerequisites
You'll need Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### Installation
1. Download or clone this project to your computer
2. Open a terminal and navigate to the project folder
3. Run this command to install all the required dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the development server by running:
```bash
npm run dev
```

Then open your web browser and go to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to see the dashboard.

### Other Useful Commands
- `npm run build` - Creates a production-ready version of the app
- `npm test` - Runs the test suite to make sure everything works
- `npm run lint` - Checks the code for any style issues

## Project Organization

The code is organized in a way that makes it easy to maintain and extend:

- `src/app/` - Contains the main pages and API routes
- `src/features/dashboard/` - Everything related to the dashboard functionality
- `src/shared/` - Reusable components and utilities that could be used in other parts of the app

## Testing

This project includes comprehensive tests to ensure everything works correctly. There are 8 different tests that cover:
- Making sure components display correctly
- Testing that data loads properly
- Verifying error handling works
- Checking that the interface responds correctly to user interactions

Run the tests with:
```bash
npm test
```

## Performance Considerations

The dashboard is built with performance in mind:
- It only re-renders parts of the screen that actually change
- Data is cached efficiently to avoid unnecessary network requests
- The code is optimized to load quickly

## Contributing

If you'd like to contribute to this project:
1. Make sure all tests pass
2. Follow the existing code style
3. Test your changes on different screen sizes
4. Make sure accessibility features still work

---

Built for healthcare technology assessment with modern React patterns.
