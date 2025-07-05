# Instructions

## How to Run the Application

Follow these steps to run the application:

### Prerequisites

1. Ensure you have Node.js installed on your system
2. Install a package manager like npm (comes with Node.js) or yarn.
3. Make sure you have Visual Studio Code or another code editor installed.
4. Clone the repository to your local machine.

### Steps to Run

1. Install Dependencies
   Open a terminal in the project root directory and run:

```
npm install
```

This will install all required dependencies.

2. Run the following command to start the development server:

```
npm run dev
```

This will start the application and open it in your default browser at `http://localhost:5173`.

3. Build the Application
   If you need to create a production build, run:

```
npm run build
```

The build files will be generated in the `build` directory.

## Adding the Widget to Zoho CRM

To integrate the application as a widget in Zoho CRM, follow these steps:

### Steps to Add the Widget

1. Log in to Zoho CRM
   Go to Zoho CRM and log in with your credentials.
2. Navigate to Developer Hub

- Click on the gear icon (Settings) in the bottom-left corner.
- Under Developer Hub, select Widgets.

3. Create a New Widget

- Click on Create New Widget.
- Provide a name for the widget (e.g., "Exchange Rate Widget").
- Select the module where the widget will be displayed (e.g., Deals).

4. Configure the Widget URL

- In the widget configuration, set the URL to point to your application. Example: `http://localhost:3000` (for development) or your production URL.
- Ensure the widget is set to Embedded App.

5. Set Permissions

- Assign the necessary permissions for the widget to access Zoho CRM APIs.
- Ensure the widget has access to the Deals module and can read/update records.

6. Save and Test

- Save the widget configuration.
- Open a record in the selected module (e.g., Deals) and verify that the widget appears and functions correctly.

## Notes

- The application uses React and interacts with Zoho CRM APIs. Ensure you have the necessary permissions and configurations for Zoho CRM.
- If you encounter issues with Zoho CRM integration, check the browser console for error messages.
- Ensure the application is running and accessible via the configured URL.
- For production deployment, you can either host the application on a cloud platform (e.g., AWS, Azure, or Vercel) and use the production URL in the widget configuration, or upload the build as a .zip archive directly to Zoho CRM and select Zoho Hosting as the hosting option.
